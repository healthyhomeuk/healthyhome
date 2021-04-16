/*
 * This file is part of the HealthyHome project monitoring server
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

#ifndef HEALTHYHOME_RPI_BME680_DEFS_H
#define HEALTHYHOME_RPI_BME680_DEFS_H

#include <cstdint>

#define BSEC_CONFIG_IAQ_LENGTH 454

/// 3.3V 4 days calibration BSEC configuration parameters
extern uint8_t bsec_config_iaq[BSEC_CONFIG_IAQ_LENGTH];

/// load BSEC state function
uint32_t loadState(uint8_t* state_buffer, uint32_t n_buffer);

/// save BSEC state function
void saveState(const uint8_t* state_buffer, uint32_t length);

/// usleep wrapper for BME68x
void delay_us(uint32_t time, void*);

/// ns timestamp function for BSEC
int64_t getTimestamp();

#endif // HEALTHYHOME_RPI_BME680_DEFS_H
