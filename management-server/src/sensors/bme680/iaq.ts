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

import { NumberType, Parameter, Quality, QualityTable } from "../types";
import Sensor from "../Sensor";

/** IAQ sensor identifier */
const IAQ_SENSOR_ID = "iaq";
/** IAQ sensor textual name */
const IAQ_SENSOR_NAME = "IAQ";

/** IAQ Index value parameter identifier */
const IAQ_INDEX_PARAM_ID = "index";
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

/**
 * IAQ Index value parameter object
 */
const IAQ_INDEX_PARAMETER: Parameter = {
    id: IAQ_INDEX_PARAM_ID,
    name: IAQ_INDEX_PARAM_NAME,
    unit: IAQ_INDEX_PARAM_UNIT,
    valueType: IAQ_INDEX_PARAM_TYPE,
    qualityTable: IAQ_INDEX_PARAM_QUALITY_TABLE,
};

/**
 * IAQ sensor object
 */
export default new Sensor(IAQ_SENSOR_ID, IAQ_SENSOR_NAME, [
    IAQ_INDEX_PARAMETER,
]);