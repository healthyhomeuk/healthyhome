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

/** CO2e sensor identifier */
const CO2E_SENSOR_ID = "co2e";
/** CO2e sensor textual name */
const CO2E_SENSOR_NAME = "CO2e";

/** CO2e value parameter identifier */
const CO2E_VALUE_PARAM_ID = "value";
/** CO2e value parameter textual name */
const CO2E_VALUE_PARAM_NAME = "";
/** CO2e value parameter measurement unit */
const CO2E_VALUE_PARAM_UNIT = "ppm";
/** CO2e value parameter value type */
const CO2E_VALUE_PARAM_TYPE = NumberType.FLOAT;
/** CO2e value parameter quality levels table */
const CO2E_VALUE_PARAM_QUALITY_TABLE: QualityTable = [
    [Quality.EXCELLENT, 0, 600],
    [Quality.GOOD, 600, 800],
    [Quality.FAIR, 800, 1500],
    [Quality.POOR, 1500, 1800],
    [Quality.BAD, 1800, Infinity],
];
/** CO2e value parameter notifications */
const CO2E_VALUE_PARAM_NOTIFICATIONS: DegradationNotifications = {
    UNKNOWN: "",
    SEVERE: "",
    VERY_BAD: "",
    BAD: "⚠️ The CO2e in your air is bad. Ventilate the room.",
    POOR:
        "⚠️ The CO2e in your air is quite poor. Please consider ventilating the room.",
    FAIR: "",
    GOOD: "",
    EXCELLENT: "",
};

/**
 * CO2e value parameter object
 */
const CO2E_VALUE_PARAMETER: Parameter = {
    id: CO2E_VALUE_PARAM_ID,
    name: CO2E_VALUE_PARAM_NAME,
    unit: CO2E_VALUE_PARAM_UNIT,
    valueType: CO2E_VALUE_PARAM_TYPE,
    qualityTable: CO2E_VALUE_PARAM_QUALITY_TABLE,
    notifications: CO2E_VALUE_PARAM_NOTIFICATIONS,
};

/** CO2e accuracy parameter identifier */
const CO2E_ACCURACY_PARAM_ID = "accuracy";
/** CO2e accuracy parameter textual name */
const CO2E_ACCURACY_PARAM_NAME = "Accuracy";
/** CO2e accuracy parameter measurement unit */
const CO2E_ACCURACY_PARAM_UNIT = "";
/** CO2e accuracy parameter value type */
const CO2E_ACCURACY_PARAM_TYPE = NumberType.INTEGER;
/** CO2e accuracy parameter quality levels table */
const CO2E_ACCURACY_PARAM_QUALITY_TABLE: QualityTable = [
    [Quality.BAD, 0, 1],
    [Quality.POOR, 1, 2],
    [Quality.GOOD, 2, 3],
    [Quality.EXCELLENT, 3, 4],
];

/**
 * CO2e accuracy parameter object
 */
const CO2E_ACCURACY_PARAMETER: Parameter = {
    id: CO2E_ACCURACY_PARAM_ID,
    name: CO2E_ACCURACY_PARAM_NAME,
    unit: CO2E_ACCURACY_PARAM_UNIT,
    valueType: CO2E_ACCURACY_PARAM_TYPE,
    qualityTable: CO2E_ACCURACY_PARAM_QUALITY_TABLE,
};

/**
 * CO2e sensor object
 */
export default new Sensor(CO2E_SENSOR_ID, CO2E_SENSOR_NAME, [
    CO2E_VALUE_PARAMETER,
    CO2E_ACCURACY_PARAMETER,
]);
