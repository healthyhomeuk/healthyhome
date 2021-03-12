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

#include <fcntl.h>
#include <linux/i2c-dev.h>
#include <linux/i2c.h>
#include <sys/ioctl.h>
#include <sys/stat.h>
#include <unistd.h>
}

#include <cstdio>
#include <linux-i2c/Driver.h>

#define FILE_PATTERN     "/dev/i2c-%d"
#define FILE_NAME_LENGTH (sizeof(FILE_PATTERN) + 1)
#define I2C_M_WR         0x0000

constexpr uint8_t MAX_DEVICE_ID      = 99;
constexpr uint16_t MAX_BUFFER_LENGTH = 0xFF;

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

Driver::~Driver()
{
    if (fd > -1) {
        close(fd);
        fd = -1;
    }
}

Core::StatusCode Driver::read(
    unsigned char deviceId,
    unsigned char command,
    Core::Comms::Packet& packet)
{
    if (fd == -1) {
        return Core::E_GENERIC;
    }

    auto size = packet.getBufferSize();

    if (size == 0 || size > MAX_BUFFER_LENGTH) {
        return Core::E_PARAMS;
    }

    uint8_t buffer[MAX_BUFFER_LENGTH];

    i2c_msg messages[2] = {
        { deviceId, I2C_M_WR, 1, &command },
        { deviceId, I2C_M_RD, static_cast<uint16_t>(size), buffer },
    };

    i2c_rdwr_ioctl_data data = { messages, 2 };

    if (ioctl(fd, I2C_RDWR, &data) != 2) {
        // TODO: log strerror(errno);
        return Core::E_GENERIC;
    }

    return packet.deserialize(buffer);
}

Core::StatusCode Driver::write(
    unsigned char deviceId,
    unsigned char command,
    Core::Comms::Packet& packet)
{
    if (fd == -1) {
        return Core::E_GENERIC;
    }

    Core::StatusCode res;
    auto size = packet.getBufferSize();

    if (size == 0 || size > MAX_BUFFER_LENGTH - 1) {
        return Core::E_PARAMS;
    }

    uint8_t buffer[MAX_BUFFER_LENGTH];

    buffer[0] = command;
    if ((res = packet.serialize(buffer + 1)) != Core::SUCCESS) {
        return res;
    }

    i2c_msg messages[1] = {
        { deviceId, I2C_M_WR, static_cast<uint16_t>(size + 1), buffer },
    };

    i2c_rdwr_ioctl_data data = { messages, 1 };

    if (ioctl(fd, I2C_RDWR, &data) != 1) {
        // TODO: log strerror(errno);
        return Core::E_GENERIC;
    }

    return Core::SUCCESS;
}