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

extern "C" {

#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>

}

#include <cstdio>

#include <linux-i2c/Driver.h>

#define FILE_PATTERN "/dev/i2c-%d"
#define MAX_DEVICE_ID 99
#define FILE_NAME_LENGTH (sizeof(FILE_PATTERN)+1)

using namespace LinuxI2C;

Core::StatusCode Driver::open(int deviceId)
{
    if (fd > -1) {
        return Core::E_CONFLICT;
    }

    if (deviceId < 0 || deviceId > MAX_DEVICE_ID) {
        return Core::E_OUT_OF_BOUNDS;
    }

    char filename[FILE_NAME_LENGTH];
    sprintf(filename, FILE_PATTERN, deviceId);

    if ((fd = ::open(filename, O_RDWR)) < 0) {
        // TODO: log strerror(errno);
        return Core::E_GENERIC;
    }

    return Core::SUCCESS;
}

Driver::~Driver() {
    if (fd > -1) {
        close(fd);
        fd = -1;
    }
}
