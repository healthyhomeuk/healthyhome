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

/**
 * Quality level enumeration
 */
export enum Quality {
    /** Unknown quality level */
    UNKNOWN = "UNKNOWN",
    /** Severe quality level */
    SEVERE = "SEVERE",
    /** Very bad quality level */
    VERY_BAD = "VERY_BAD",
    /** Bad quality level */
    BAD = "BAD",
    /** Poor quality level */
    POOR = "POOR",
    /** Fair quality level */
    FAIR = "FAIR",
    /** Good quality level */
    GOOD = "GOOD",
    /** Excellent quality level */
    EXCELLENT = "EXCELLENT",
}

export enum QualityLevel {
    UNKNOWN = -1,
    SEVERE,
    VERY_BAD,
    BAD,
    POOR,
    FAIR,
    GOOD,
    EXCELLENT,
}

/**
 * Number type enumeration
 */
export enum NumberType {
    /** Integer number type */
    INTEGER = "INTEGER",
    /** Float number type */
    FLOAT = "FLOAT",
}

/**
 * Quality boundary formed of:
 * - Quality level
 * - Lower boundary (inclusive)
 * - Upper boundary (exclusive)
 *
 * @example
 * // An excellent level of `0 <= value < 100` is defined as:
 * const boundary: QualityBoundary = [Quality.EXCELLENT, 0, 100];
 */
export type QualityBoundary = [Quality, number, number];

/**
 * Quality table in order of either:
 * - From smallest to largest range
 * - From lowest to highest range
 */
export type QualityTable = QualityBoundary[];

/**
 * Value-quality pair
 */
export type ValueQualityPair = {
    /** Sensor numeric value */
    value: number;
    /** Sensor quality level value */
    quality: Quality;
};

/**
 * Notifications for a range-type value.
 */
export interface NotificationOuterRange {
    LOWER: string;
    UPPER: string;
}

/**
 * Table of push notifications to quality level.
 */
export interface DegradationNotifications {
    UNKNOWN: NotificationOuterRange | string;
    SEVERE: NotificationOuterRange | string;
    VERY_BAD: NotificationOuterRange | string;
    BAD: NotificationOuterRange | string;
    POOR: NotificationOuterRange | string;
    FAIR: NotificationOuterRange | string;
    GOOD: NotificationOuterRange | string;
    EXCELLENT: NotificationOuterRange | string;
}

/**
 * Definition of a sensor parameter
 */
export interface Parameter {
    /** Parameter identifier */
    readonly id: string;
    /** Parameter textual name */
    readonly name: string;
    /** Parameter measurement unit */
    readonly unit: string;
    /** Parameter quality levels table */
    readonly qualityTable: QualityTable;
    /** Parameter value number type */
    readonly valueType: NumberType;
    /** List of degradation notifications */
    readonly notifications?: DegradationNotifications;
}
