/*
 * This file is part of the HealthyHome project management server
 * available at <https://www.github.com/healthyhomeuk/healthyhome>.
 *
 * Copyright (C) 2021 the authors of the HealthyHome project.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3 of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Body as MessageBody } from "../messages/Message";
import { SensorUpdate, Sensor as SensorSchema } from "../schema";
import {
    NotificationOuterRange,
    Parameter,
    Quality,
    QualityBoundary,
    QualityLevel,
    QualityTable,
    ValueQualityPair,
} from "./types";

const SUBPAR_QUALITY_THRESHOLD_LEVEL = QualityLevel.POOR;

/**
 * Sensor class
 *
 * When a sensor object is created, this can parse any incoming updates
 * from the monitoring server, storing its respectful values and inferring
 * the respective quality level.
 */
export default class Sensor {
    /** Sensor identifier */
    readonly id: string;
    /** Sensor textual name */
    readonly name: string;
    /** Sensor parameters list */
    readonly parameters: Parameter[];

    private values: { [paramId: string]: ValueQualityPair };
    private previousQuality: { [paramId: string]: Quality };

    /**
     * Constructor of a Sensor object
     * @param id - Sensor identifier
     * @param name - Sensor textual name
     * @param params - Sensor parameters list
     */
    constructor(id: string, name: string, params: Parameter[]) {
        this.id = id;
        this.name = name;
        this.parameters = params;

        this.values = Object.fromEntries(
            params.map((param) => {
                return [param.id, { value: NaN, quality: Quality.UNKNOWN }];
            })
        );

        this.previousQuality = Object.fromEntries(
            params.map((param) => [param.id, Quality.UNKNOWN])
        );
    }

    /**
     * Generate a GraphQL update
     */
    generateOutgoingUpdate(): SensorUpdate {
        return {
            id: this.id,
            parameters: this.parameters.map(({ id }) => ({
                id,
                value: this.values[id].value,
                quality: this.values[id].quality,
            })),
        };
    }

    /**
     * Parse a monitoring server incoming update
     * @param body - body of the incoming message
     * @throws Error if the body is invalid
     */
    parseIncomingUpdate(body: MessageBody): void {
        const values: { [paramId: string]: ValueQualityPair } = {};

        for (const param of this.parameters) {
            if (body[param.id] === undefined) {
                throw Error(`missing '${param.id}' value in update`);
            }

            const value = <number>body[param.id];

            this.previousQuality[param.id] = this.values[param.id].quality;

            values[param.id] = {
                value,
                quality: Sensor.matchQuality(param.qualityTable, value),
            };
        }

        this.values = values;
    }

    /**
     * Checks if the quality has degraded to a sub-par level and returns the
     * notifications to push.
     *
     * @returns a list containing degradation notifications if there are
     * any available. Otherwise returns an empty list.
     */
    getDegradationNotifications(): string[] {
        const notifications: string[] = [];

        for (const paramId in this.values) {
            const currentLevel = QualityLevel[this.values[paramId].quality];
            const previousLevel = QualityLevel[this.previousQuality[paramId]];
            if (
                (currentLevel < previousLevel ||
                    previousLevel === QualityLevel.UNKNOWN) &&
                currentLevel !== QualityLevel.UNKNOWN &&
                currentLevel <= SUBPAR_QUALITY_THRESHOLD_LEVEL
            ) {
                const param = this.parameters.find((el) => el.id === paramId)!;
                if (!param.notifications) continue;

                const notificationEntry =
                    param.notifications[this.values[paramId].quality];

                const notification =
                    typeof notificationEntry === "string"
                        ? notificationEntry
                        : Sensor.getRangeNotification(
                              notificationEntry,
                              param.qualityTable,
                              this.values[paramId]
                          );

                notifications.push(notification);
            }
        }

        return notifications;
    }

    /**
     * Generates a representation of the sensor as {@link SensorSchema}.
     */
    toSchema(): SensorSchema {
        return {
            id: this.id,
            name: this.name,
            parameters: this.parameters.map((param) => {
                const qualityTable = param.qualityTable.map((entry) => {
                    const lowerBoundary = Number.isFinite(entry[1])
                        ? entry[1]
                        : undefined;
                    const upperBoundary = Number.isFinite(entry[2])
                        ? entry[2]
                        : undefined;

                    return {
                        qualityValue: entry[0],
                        lowerBoundary,
                        upperBoundary,
                    };
                });

                return {
                    id: param.id,
                    name: param.name,
                    unit: param.unit,
                    qualityTable,
                    valueType: param.valueType,
                    currentValue: this.values[param.id].value ?? undefined,
                    currentQuality: this.values[param.id].quality,
                };
            }),
        };
    }

    static getRangeNotification(
        entry: NotificationOuterRange,
        table: QualityTable,
        pair: ValueQualityPair
    ): string {
        const boundaries = table.find((el) => el[0] === pair.quality);
        if (!boundaries) throw Error("Expected quality not present in table");

        const [_, lower, upper] = boundaries;
        const mid = (upper + lower) / 2;

        if (pair.value < mid) {
            return entry.LOWER;
        }

        return entry.UPPER;
    }

    /**
     * Helper function that matches a value to its rightful {@link Quality}
     * level, from the given {@link QualityTable}. If the value could not be
     * matched a {@link Quality.UNKNOWN} level is returned instead.
     *
     * @param table - quality table to match the value to
     * @param value - value to match
     */
    static matchQuality(table: QualityTable, value: number): Quality {
        for (const [quality, lowerBound, upperBound] of table) {
            if (lowerBound <= value && value < upperBound) return quality;
        }

        return Quality.UNKNOWN;
    }
}
