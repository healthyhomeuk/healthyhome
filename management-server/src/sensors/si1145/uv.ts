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

import Sensor from "../Sensor";
import {
    DegradationNotifications,
    NumberType,
    Parameter,
    Quality,
    QualityTable,
} from "../types";

/** UV sensor identifier */
const UV_SENSOR_ID = "uv";
/** UV sensor textual name */
const UV_SENSOR_NAME = "UV";

/** UV Index parameter identifier */
const UV_INDEX_PARAM_ID = "value";
/** UV Index parameter textual name */
const UV_INDEX_PARAM_NAME = "Index";
/** UV Index parameter measurement unit */
const UV_INDEX_PARAM_UNIT = "";
/** UV Index parameter value type */
const UV_INDEX_PARAM_TYPE = NumberType.FLOAT;
/** UV Index parameter quality levels table */
const UV_INDEX_PARAM_QUALITY_TABLE: QualityTable = [
    [Quality.GOOD, 0, 3],
    [Quality.FAIR, 3, 6],
    [Quality.POOR, 6, 8],
    [Quality.BAD, 8, 11],
    [Quality.VERY_BAD, 11, Infinity],
];
/** UV Index value parameter notifications */
const UV_INDEX_PARAM_NOTIFICATIONS: DegradationNotifications = {
    UNKNOWN: "",
    SEVERE: "",
    VERY_BAD:
        "☀️ The UV index is dangerously high. You must limit the sunlight entering the room. Close the blinds/curtains.",
    BAD: "☀️ The UV index is high. Limit the sunlight entering the room.",
    POOR:
        "️☀️ The UV index is quite high. Consider limiting the sunlight entering the room.",
    FAIR: "",
    GOOD: "",
    EXCELLENT: "",
};

/**
 * UV Index parameter object
 */
const UV_INDEX_PARAMETER: Parameter = {
    id: UV_INDEX_PARAM_ID,
    name: UV_INDEX_PARAM_NAME,
    unit: UV_INDEX_PARAM_UNIT,
    valueType: UV_INDEX_PARAM_TYPE,
    qualityTable: UV_INDEX_PARAM_QUALITY_TABLE,
    notifications: UV_INDEX_PARAM_NOTIFICATIONS,
};

/**
 * UV sensor object
 */
export default new Sensor(UV_SENSOR_ID, UV_SENSOR_NAME, [UV_INDEX_PARAMETER]);
