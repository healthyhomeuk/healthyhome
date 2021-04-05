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

#ifndef ZMQ_POSTMAN_DEFS_H
#define ZMQ_POSTMAN_DEFS_H

#include <core/Message.h>
#include <core/defs.h>
#include <unordered_map>

namespace ZmqPostman {

/**
 * @brief Status codes string mappings
 */
static std::unordered_map<Core::StatusCode, std::string> STATUS_CODES
    = { { Core::SUCCESS, "OK" },
        { Core::E_PARAMS, "BAD REQUEST" },
        { Core::E_NOT_FOUND, "NOT FOUND" } };

/**
 * @brief Entity types string mappings
 */
static std::unordered_map<Core::Message::EntityType, std::string> ENTITY_TYPES
    = {
          { Core::Message::SERVER, "SERVER" },
          { Core::Message::DEVICE, "DEVICE" },
          { Core::Message::SENSOR, "SENSOR" },
      };

constexpr std::size_t MIN_MESSAGE_HEADER_LENGTH = 2;

/**
 * @brief Hash function for Core::Message::Identity
 */
struct IdentityHash {
    /// Hashes an identity
    std::size_t operator()(const Core::Message::Identity& identity) const
    {
        return std::hash<std::string>()(
            ENTITY_TYPES[std::get<0>(identity)] + std::get<1>(identity)
            + std::get<2>(identity));
    }
};

using Factories = std::unordered_map<
    Core::Message::Identity,
    Core::Message::Factory,
    IdentityHash>;

}

#endif // ZMQ_POSTMAN_DEFS_H
