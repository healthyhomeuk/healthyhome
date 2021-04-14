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

import { NumberType, Quality, QualityTable } from "../types";

/** Particle count parameter identifier */
const PARTICLE_COUNT_PARAM_ID = "particleCount";
/** Particle count parameter textual name */
const PARTICLE_COUNT_PARAM_NAME = "Particle Count";
/** Particle count parameter measurement unit */
const PARTICLE_COUNT_PARAM_UNIT = "ppm";
/** Particle count parameter value type */
const PARTICLE_COUNT_PARAM_TYPE = NumberType.INTEGER;

/**
 * Particle count parameter object
 */
export const PARTICLE_COUNT_PARAMETER = {
    id: PARTICLE_COUNT_PARAM_ID,
    name: PARTICLE_COUNT_PARAM_NAME,
    unit: PARTICLE_COUNT_PARAM_UNIT,
    valueType: PARTICLE_COUNT_PARAM_TYPE,
};

/** Density parameter identifier */
const DENSITY_PARAM_ID = "density";
/** Density parameter textual name */
const DENSITY_PARAM_NAME = "Density";
/** Density parameter measurement unit */
const DENSITY_PARAM_UNIT = "µg/m3";
/** Density parameter value type */
const DENSITY_PARAM_TYPE = NumberType.FLOAT;
/** Density parameter quality levels table */
const DENSITY_PARAM_QUALITY_TABLE: QualityTable = [
    [Quality.EXCELLENT, 0, 24],
    [Quality.GOOD, 24, 42],
    [Quality.FAIR, 42, 54],
    [Quality.POOR, 54, 65],
    [Quality.BAD, 65, Infinity],
];

/**
 * Density parameter object
 */
export const DENSITY_PARAMETER = {
    id: DENSITY_PARAM_ID,
    name: DENSITY_PARAM_NAME,
    unit: DENSITY_PARAM_UNIT,
    valueType: DENSITY_PARAM_TYPE,
    qualityTable: DENSITY_PARAM_QUALITY_TABLE,
};
