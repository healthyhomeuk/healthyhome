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

/** Temperature sensor identifier */
const TEMP_SENSOR_ID = "temp";
/** Temperature sensor textual name */
const TEMP_SENSOR_NAME = "Temperature";

/** Temperature value parameter identifier */
const TEMP_VALUE_PARAM_ID = "value";
/** Temperature value parameter textual name */
const TEMP_VALUE_PARAM_NAME = "";
/** Temperature value parameter measurement unit */
const TEMP_VALUE_PARAM_UNIT = "°C";
/** Temperature value parameter value type */
const TEMP_VALUE_PARAM_TYPE = NumberType.FLOAT;
/** Temperature value parameter quality levels table */
const TEMP_VALUE_PARAM_QUALITY_TABLE: QualityTable = [
    [Quality.EXCELLENT, 18, 21],
    [Quality.GOOD, 17, 22],
    [Quality.FAIR, 16, 23],
    [Quality.POOR, 15, 24],
    [Quality.BAD, -Infinity, Infinity],
];
/** Temperature value parameter notifications */
const TEMP_PARAM_NOTIFICATIONS: DegradationNotifications = {
    UNKNOWN: "",
    SEVERE: "",
    VERY_BAD: "",
    BAD: {
        LOWER:
            "❄️ The temperature in the room is low. Turn on your heating system.",
        UPPER:
            "🔥 The temperature in the room is high. Open some windows or doors to reduce the heat.",
    },
    POOR: {
        LOWER:
            "️❄️ The temperature in the room is quite low. You may begin to feel cold",
        UPPER:
            "🔥 The temperature in the room is quite high. You may begin to feel warm",
    },
    FAIR: "",
    GOOD: "",
    EXCELLENT: "",
};
/**
 * Temperature value parameter object
 */
const TEMP_VALUE_PARAMETER: Parameter = {
    id: TEMP_VALUE_PARAM_ID,
    name: TEMP_VALUE_PARAM_NAME,
    unit: TEMP_VALUE_PARAM_UNIT,
    valueType: TEMP_VALUE_PARAM_TYPE,
    qualityTable: TEMP_VALUE_PARAM_QUALITY_TABLE,
    notifications: TEMP_PARAM_NOTIFICATIONS,
};

/**
 * Temperature sensor object
 */
export default new Sensor(TEMP_SENSOR_ID, TEMP_SENSOR_NAME, [
    TEMP_VALUE_PARAMETER,
]);
