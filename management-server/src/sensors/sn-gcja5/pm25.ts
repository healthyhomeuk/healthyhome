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

import {
    DegradationNotifications,
    Parameter,
    Quality,
    QualityTable,
} from "../types";
import { DENSITY_PARAMETER, PARTICLE_COUNT_PARAMETER } from "./params";
import Sensor from "../Sensor";

/** PM2.5 sensor identifier */
const PM25_SENSOR_ID = "pm25";
/** PM2.5 sensor textual name */
const PM25_SENSOR_NAME = "PM2.5";

/** PM2.5 particle count parameter quality levels table */
const PM25_COUNT_PARAM_QUALITY_TABLE: QualityTable = [
    [Quality.EXCELLENT, 0, 546],
    [Quality.FAIR, 546, 1363],
    [Quality.BAD, 1363, Infinity],
];

/** PM2.5 density parameter notifications */
const PM25_DENSITY_PARAM_NOTIFICATIONS: DegradationNotifications = {
    UNKNOWN: "",
    SEVERE: "",
    VERY_BAD: "",
    BAD: "The PM2.5 density in your air is high. Ventilate the room.",
    POOR:
        "️The PM2.5 density in your air is quite high. Consider ventilating the room.",
    FAIR: "",
    GOOD: "",
    EXCELLENT: "",
};

/**
 * PM2.5 parameters table
 */
const PM25_PARAMETERS: Parameter[] = [
    {
        ...PARTICLE_COUNT_PARAMETER,
        qualityTable: PM25_COUNT_PARAM_QUALITY_TABLE,
    },
    {
        ...DENSITY_PARAMETER,
        notifications: PM25_DENSITY_PARAM_NOTIFICATIONS,
    },
];

/**
 * PM2.5 sensor object
 */
export default new Sensor(PM25_SENSOR_ID, PM25_SENSOR_NAME, PM25_PARAMETERS);
