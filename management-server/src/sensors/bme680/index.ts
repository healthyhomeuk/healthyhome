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

import temperature from "./temperature";
import humidity from "./humidity";
import iaq from "./iaq";
import co2e from "./co2e";

/**
 * BME680 sensors exported by their identifier
 */
export default {
    [temperature.id]: temperature,
    [humidity.id]: humidity,
    [iaq.id]: iaq,
    [co2e.id]: co2e,
};
