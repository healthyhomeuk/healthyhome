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

import { DevicesList, SensorsList } from "./List";
import * as mq from "../message-queue";

/**
 * Promise that queries the monitoring server of the available
 * devices list.
 * @returns The list of device identifiers
 */
export function getDevices(): Promise<string[]> {
    return mq.query(new DevicesList()).then((msg) => msg.list);
}

/**
 * Promise that queries the monitoring server of the available
 * sensors list.
 * @returns The list of sensors identifiers
 */
export function getSensors(): Promise<string[]> {
    return mq.query(new SensorsList()).then((msg) => msg.list);
}
