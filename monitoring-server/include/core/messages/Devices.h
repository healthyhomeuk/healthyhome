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

/**
 * @file core/messages/Devices.h
 */

#ifndef CORE_MESSAGES_DEVICES_H
#define CORE_MESSAGES_DEVICES_H

#include <core/Device.h>
#include <core/Message.h>

namespace Core::Messages {

/**
 * @brief Devices server request message
 */
struct Devices : public Message {
    /// Sets entity
    SET_ENTITY = SERVER_ENTITY;
    /// Sets subject
    SET_SUBJECT = "devices";
    /// Common Message codebase
    MAKE_MESSAGE(Devices);
    /// Static deserializer codebase
    STATIC_DESERIALIZER(Devices);
    /// Static serializer codebase
    STATIC_SERIALIZER(Devices);

    /**
     * @name Response body
     * @{
     */

    /**
     * @brief List of devices names
     */
    std::vector<std::string> devicesNames;

    /**
     * @}
     */

    /**
     * @brief Constructor loading a map of devices
     *
     * Constructs a Devices message from a devices map. It loads
     * all the devices names from the map into Sensors::devicesNames.
     *
     * @param devices Devices mapping
     */
    explicit Devices(std::unordered_map<std::string, Device&>& devices);
};

}

#endif // CORE_MESSAGES_DEVICES_H
