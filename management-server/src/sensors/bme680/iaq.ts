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

/** IAQ sensor identifier */
const IAQ_SENSOR_ID = "iaq";
/** IAQ sensor textual name */
const IAQ_SENSOR_NAME = "IAQ";

/** IAQ Index value parameter identifier */
const IAQ_INDEX_PARAM_ID = "value";
/** IAQ Index value parameter textual name */
const IAQ_INDEX_PARAM_NAME = "Index";
/** IAQ Index value parameter measurement unit */
const IAQ_INDEX_PARAM_UNIT = "";
/** IAQ Index value parameter value type */
const IAQ_INDEX_PARAM_TYPE = NumberType.INTEGER;
/** IAQ Index value parameter quality levels table */
const IAQ_INDEX_PARAM_QUALITY_TABLE: QualityTable = [
    [Quality.EXCELLENT, 0, 51],
    [Quality.GOOD, 51, 101],
    [Quality.FAIR, 101, 151],
    [Quality.POOR, 151, 201],
    [Quality.BAD, 201, 251],
    [Quality.VERY_BAD, 251, 351],
    [Quality.SEVERE, 351, Infinity],
];
/** IAQ Index value parameter notifications */
const IAQ_INDEX_PARAM_NOTIFICATIONS: DegradationNotifications = {
    UNKNOWN: "",
    SEVERE:
        "⚠️ The IAQ of your air is at a dangerously high level. If you cannot ventilate the room with clean air, consider leaving the room.",
    VERY_BAD:
        "⚠️ The IAQ of your air is very bad. You must ventilate the room.",
    BAD: "⚠️ The IAQ of your air is bad. Ventilate the room.",
    POOR:
        "⚠️ The IAQ of your air is quite poor. Consider ventilating the room.",
    FAIR: "",
    GOOD: "",
    EXCELLENT: "",
};

/**
 * IAQ Index value parameter object
 */
const IAQ_INDEX_PARAMETER: Parameter = {
    id: IAQ_INDEX_PARAM_ID,
    name: IAQ_INDEX_PARAM_NAME,
    unit: IAQ_INDEX_PARAM_UNIT,
    valueType: IAQ_INDEX_PARAM_TYPE,
    qualityTable: IAQ_INDEX_PARAM_QUALITY_TABLE,
    notifications: IAQ_INDEX_PARAM_NOTIFICATIONS,
};

/** IAQ accuracy parameter identifier */
const IAQ_ACCURACY_PARAM_ID = "accuracy";
/** IAQ accuracy parameter textual name */
const IAQ_ACCURACY_PARAM_NAME = "Accuracy";
/** IAQ accuracy parameter measurement unit */
const IAQ_ACCURACY_PARAM_UNIT = "";
/** IAQ accuracy parameter value type */
const IAQ_ACCURACY_PARAM_TYPE = NumberType.INTEGER;
/** IAQ accuracy parameter quality levels table */
const IAQ_ACCURACY_PARAM_QUALITY_TABLE: QualityTable = [
    [Quality.BAD, 0, 1],
    [Quality.POOR, 1, 2],
    [Quality.GOOD, 2, 3],
    [Quality.EXCELLENT, 3, 4],
];

/**
 * IAQ accuracy parameter object
 */
const IAQ_ACCURACY_PARAMETER: Parameter = {
    id: IAQ_ACCURACY_PARAM_ID,
    name: IAQ_ACCURACY_PARAM_NAME,
    unit: IAQ_ACCURACY_PARAM_UNIT,
    valueType: IAQ_ACCURACY_PARAM_TYPE,
    qualityTable: IAQ_ACCURACY_PARAM_QUALITY_TABLE,
};

/**
 * IAQ sensor object
 */
export default new Sensor(IAQ_SENSOR_ID, IAQ_SENSOR_NAME, [
    IAQ_INDEX_PARAMETER,
    IAQ_ACCURACY_PARAMETER,
]);
