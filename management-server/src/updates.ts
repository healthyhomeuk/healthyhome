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

import Message from "./messages/Message";
import sensors from "./sensors";
import { PubSub } from "apollo-server";
import { SensorUpdate } from "./schema";

const pubsub = new PubSub();

/** Updates trigger name */
export const triggerName = "UPDATE";

/**
 * Function that processes incoming messages from the monitoring server
 * @param msg - Message
 */
export function process(msg: Message): void {
    if (msg.subject === "update") {
        const sensor = sensors[msg.entity[1]];

        if (sensor) {
            if (msg.body) {
                sensor.parseIncomingUpdate(msg.body);

                pubsub.publish(triggerName, {
                    sensorUpdate: sensor.generateOutgoingUpdate(),
                });
            } else {
                console.error(
                    `received no body in update from '${msg.entity[1]}'`
                );
            }
        } else {
            console.error(`sensor name '${msg.entity[1]}' was not found`);
        }
    }
}

/**
 * GraphQL sensorUpdate subscription resolver
 */
export function pushUpdates(): AsyncIterator<SensorUpdate> {
    return pubsub.asyncIterator([triggerName]);
}
