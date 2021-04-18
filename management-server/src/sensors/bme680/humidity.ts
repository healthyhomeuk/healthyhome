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
    NumberType,
    Parameter,
    Quality,
    QualityTable,
} from "../types";
import Sensor from "../Sensor";

/** Humidity sensor identifier */
const HUM_SENSOR_ID = "hum";
/** Humidity sensor textual name */
const HUM_SENSOR_NAME = "Humidity";

/** Humidity value parameter identifier */
const HUM_VALUE_PARAM_ID = "value";
/** Humidity value parameter textual name */
const HUM_VALUE_PARAM_NAME = "";
/** Humidity value parameter measurement unit */
const HUM_VALUE_PARAM_UNIT = "%rH";
/** Humidity value parameter value type */
const HUM_VALUE_PARAM_TYPE = NumberType.FLOAT;
/** Humidity value parameter quality levels table */
const HUM_VALUE_PARAM_QUALITY_TABLE: QualityTable = [
    [Quality.EXCELLENT, 40, 60],
    [Quality.GOOD, 30, 70],
    [Quality.FAIR, 20, 80],
    [Quality.POOR, 10, 90],
    [Quality.BAD, -Infinity, Infinity],
];
/** Humidity value parameter notifications */
const HUM_PARAM_NOTIFICATIONS: DegradationNotifications = {
    UNKNOWN: "",
    SEVERE: "",
    VERY_BAD: "",
    BAD: {
        LOWER: "🌵 The humidity in your air is low. Use a humidifier",
        UPPER: "💧 The humidity in your air is high. Use a dehumidifier",
    },
    POOR: {
        LOWER:
            "🌵 The humidity in your air is quite low. You may begin to feel cold.",
        UPPER:
            "💧 The humidity in your air is quite high. You may begin to feel uncomfortable.",
    },
    FAIR: "",
    GOOD: "",
    EXCELLENT: "",
};
/**
 * Humidity value parameter object
 */
const HUM_VALUE_PARAMETER: Parameter = {
    id: HUM_VALUE_PARAM_ID,
    name: HUM_VALUE_PARAM_NAME,
    unit: HUM_VALUE_PARAM_UNIT,
    valueType: HUM_VALUE_PARAM_TYPE,
    qualityTable: HUM_VALUE_PARAM_QUALITY_TABLE,
    notifications: HUM_PARAM_NOTIFICATIONS,
};

/**
 * Humidity sensor object
 */
export default new Sensor(HUM_SENSOR_ID, HUM_SENSOR_NAME, [
    HUM_VALUE_PARAMETER,
]);
