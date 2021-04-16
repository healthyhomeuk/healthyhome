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

import { NumberType, Parameter, QualityTable } from "../types";
import Sensor from "../Sensor";

/** Visible light sensor identifier */
const VIS_SENSOR_ID = "visible";
/** Visible light sensor textual name */
const VIS_SENSOR_NAME = "Light";

/** Visible light intensity parameter identifier */
const VIS_INTENSITY_PARAM_ID = "value";
/** Visible light intensity parameter textual name */
const VIS_INTENSITY_PARAM_NAME = "Intensity";
/** Visible light intensity parameter measurement unit */
const VIS_INTENSITY_PARAM_UNIT = "lux";
/** Visible light intensity parameter value type */
const VIS_INTENSITY_PARAM_TYPE = NumberType.INTEGER;
/** Visible light intensity parameter quality levels table */
const VIS_INTENSITY_PARAM_QUALITY_TABLE: QualityTable = [];

/**
 * Visible light intensity parameter object
 */
const VIS_INTENSITY_PARAMETER: Parameter = {
    id: VIS_INTENSITY_PARAM_ID,
    name: VIS_INTENSITY_PARAM_NAME,
    unit: VIS_INTENSITY_PARAM_UNIT,
    valueType: VIS_INTENSITY_PARAM_TYPE,
    qualityTable: VIS_INTENSITY_PARAM_QUALITY_TABLE,
};

/**
 * Visible light sensor object
 */
export default new Sensor(VIS_SENSOR_ID, VIS_SENSOR_NAME, [
    VIS_INTENSITY_PARAMETER,
]);
