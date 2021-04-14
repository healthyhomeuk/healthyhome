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

import Sensor from "./Sensor";
import { GetSensorsQuery, Sensor as SensorSchema } from "../schema";
import { getSensors as getAvailableSensors } from "../messages";
import bme680 from "./bme680";
import snGcja5 from "./sn-gcja5";
import si1145 from "./si1145";

/**
 * Definition of {@link Sensor}s identified by their identifiers
 */
export type Sensors = { [key: string]: Sensor };

/**
 * List of all the implemented sensors
 */
const sensors: Sensors = {
    ...bme680,
    ...snGcja5,
    ...si1145,
};

/**
 * List of the sensors identifiers advertised by the monitoring server
 */
let availableSensors: string[];

/**
 * Resolver for the GraphQL sensor query which provides a full
 * mapping to all of the available sensors.
 *
 * @param _ - unused
 * @param desiredId - Optional search parameter
 */
export async function getSensors(
    _: unknown,
    { id: desiredId }: GetSensorsQuery
): Promise<SensorSchema[]> {
    if (!availableSensors) availableSensors = await getAvailableSensors();

    const sensorsList: Sensor[] = availableSensors
        .map((id) => sensors[id])
        .filter(({ id }) => !desiredId || desiredId === id);

    return sensorsList.map((sensor) => sensor.toSchema());
}

export default sensors;
