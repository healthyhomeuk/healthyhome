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
 * @file libs/sn-gcja5/include/sn-gcja5/StatusMessage.h
 */

#ifndef SNGCJA5_STATUS_MESSAGE_H
#define SNGCJA5_STATUS_MESSAGE_H

#include <core/Device.h>
#include <core/Message.h>
#include <sn-gcja5/defs.h>

/**
 * @brief Namespace for the Panasonic SN-GCJA5 library.
 */
namespace SNGCJA5 {

/**
 * @brief Message carrying the sensor status values
 * @headerfile sn-gcja5/StatusMessage.h <sn-gcja5/StatusMessage.h>
 */
struct StatusMessage : public Core::Message {
    /// Sets entity
    SET_ENTITY = DEVICE_ENTITY("sn-gcja5");
    /// Sets subject
    SET_SUBJECT = "status";
    /// Common Message codebase
    MAKE_MESSAGE(StatusMessage);
    /// Static deserializer codebase
    STATIC_DESERIALIZER(StatusMessage);
    /// Static serializer codebase
    STATIC_SERIALIZER(StatusMessage);

    /**
     * @brief Constructor
     * @param _sensor Sensor status value
     * @param _pd PD status value
     * @param _ld LD status value
     * @param _fan Fan status value
     */
    StatusMessage(
        SensorStatus _sensor,
        PDLDStatus _pd,
        PDLDStatus _ld,
        FanStatus _fan) :
        sensor(_sensor),
        pd(_pd), ld(_ld), fan(_fan)
    {
    }

    SensorStatus sensor; ///< Sensor status
    PDLDStatus pd;       ///< PD status
    PDLDStatus ld;       ///< LD status
    FanStatus fan;       ///< Fan status
};

}

#endif // SNGCJA5_STATUS_MESSAGE_H
