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

import { Parameter, Quality, QualityTable } from "../types";
import { DENSITY_PARAMETER, PARTICLE_COUNT_PARAMETER } from "./params";
import Sensor from "../Sensor";

/** PM10 sensor identifier */
const PM100_SENSOR_ID = "pm100";
/** PM10 sensor textual name */
const PM100_SENSOR_NAME = "PM10";

/** PM10 particle count parameter quality levels table */
const PM100_COUNT_PARAM_QUALITY_TABLE: QualityTable = [
    [Quality.EXCELLENT, 0, 69],
    [Quality.FAIR, 69, 171],
    [Quality.BAD, 171, Infinity],
];

/**
 * PM10 parameters table
 */
const PM100_PARAMETERS: Parameter[] = [
    {
        ...PARTICLE_COUNT_PARAMETER,
        qualityTable: PM100_COUNT_PARAM_QUALITY_TABLE,
    },
    DENSITY_PARAMETER,
];

/**
 * PM10 sensor object
 */
export default new Sensor(PM100_SENSOR_ID, PM100_SENSOR_NAME, PM100_PARAMETERS);
