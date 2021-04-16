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

#include <bme680_defs.h>
#include <fstream>
#include <sys/time.h>
#include <unistd.h>

static const char* BSEC_STATE_FILE = "/var/lib/monitd/bsec.db";

uint32_t loadState(uint8_t* state_buffer, uint32_t n_buffer)
{
    std::basic_ifstream<uint8_t> file(BSEC_STATE_FILE, std::ios::binary);

    uint32_t res = 0;

    if (file.is_open()) {
        file.seekg(0, std::ios_base::end);
        size_t length = file.tellg();
        file.seekg(0, std::ios_base::beg);

        if (length > n_buffer) {
            file.close();
            return res;
        }

        file.read(state_buffer, length);
        file.close();
    }

    return res;
}

void saveState(const uint8_t* state_buffer, uint32_t length)
{
    std::ofstream file(BSEC_STATE_FILE, std::ios::binary | std::ios::trunc);

    if (file.is_open()) {
        file.write(reinterpret_cast<const char*>(state_buffer), length);
        file.close();
    }
}

void delay_us(uint32_t time, void*)
{
    usleep(time);
}

int64_t getTimestamp()
{
    timeval tv;
    gettimeofday(&tv, nullptr);
    return static_cast<int64_t>(tv.tv_sec) * 1e9
           + static_cast<int64_t>(tv.tv_usec) * 1e3;
}

uint8_t bsec_config_iaq[BSEC_CONFIG_IAQ_LENGTH] = {
    0,   8,   4,   1,   61,  0,   0,   0,   0,   0,   0,   0,   174, 1,   0,
    0,   48,  0,   1,   0,   0,   192, 168, 71,  64,  49,  119, 76,  0,   0,
    225, 68,  137, 65,  0,   191, 205, 204, 204, 190, 0,   0,   64,  191, 225,
    122, 148, 190, 0,   0,   0,   0,   216, 85,  0,   100, 0,   0,   0,   0,
    0,   0,   0,   0,   28,  0,   2,   0,   0,   244, 1,   225, 0,   25,  0,
    0,   128, 64,  0,   0,   32,  65,  144, 1,   0,   0,   112, 65,  0,   0,
    0,   63,  16,  0,   3,   0,   10,  215, 163, 60,  10,  215, 35,  59,  10,
    215, 35,  59,  9,   0,   5,   0,   0,   0,   0,   0,   1,   88,  0,   9,
    0,   229, 208, 34,  62,  0,   0,   0,   0,   0,   0,   0,   0,   218, 27,
    156, 62,  225, 11,  67,  64,  0,   0,   160, 64,  0,   0,   0,   0,   0,
    0,   0,   0,   94,  75,  72,  189, 93,  254, 159, 64,  66,  62,  160, 191,
    0,   0,   0,   0,   0,   0,   0,   0,   33,  31,  180, 190, 138, 176, 97,
    64,  65,  241, 99,  190, 0,   0,   0,   0,   0,   0,   0,   0,   167, 121,
    71,  61,  165, 189, 41,  192, 184, 30,  189, 64,  12,  0,   10,  0,   0,
    0,   0,   0,   0,   0,   0,   0,   229, 0,   254, 0,   2,   1,   5,   48,
    117, 100, 0,   44,  1,   112, 23,  151, 7,   132, 3,   197, 0,   92,  4,
    144, 1,   64,  1,   64,  1,   144, 1,   48,  117, 48,  117, 48,  117, 48,
    117, 100, 0,   100, 0,   100, 0,   48,  117, 48,  117, 48,  117, 100, 0,
    100, 0,   48,  117, 48,  117, 100, 0,   100, 0,   100, 0,   100, 0,   48,
    117, 48,  117, 48,  117, 100, 0,   100, 0,   100, 0,   48,  117, 48,  117,
    100, 0,   100, 0,   44,  1,   44,  1,   44,  1,   44,  1,   44,  1,   44,
    1,   44,  1,   44,  1,   44,  1,   44,  1,   44,  1,   44,  1,   44,  1,
    44,  1,   8,   7,   8,   7,   8,   7,   8,   7,   8,   7,   8,   7,   8,
    7,   8,   7,   8,   7,   8,   7,   8,   7,   8,   7,   8,   7,   8,   7,
    112, 23,  112, 23,  112, 23,  112, 23,  112, 23,  112, 23,  112, 23,  112,
    23,  112, 23,  112, 23,  112, 23,  112, 23,  112, 23,  112, 23,  255, 255,
    255, 255, 255, 255, 255, 255, 220, 5,   220, 5,   220, 5,   255, 255, 255,
    255, 255, 255, 220, 5,   220, 5,   255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 255, 255, 255, 255, 255, 255, 44,  1,   0,   0,   0,   0,
    237, 52,  0,   0
};