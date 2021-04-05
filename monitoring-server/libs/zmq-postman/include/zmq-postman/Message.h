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

#ifndef ZMQ_POSTMAN_MESSAGE_H
#define ZMQ_POSTMAN_MESSAGE_H

#include <core/Message.h>
#include <iterator>
#include <unordered_map>
#include <zmq-postman/defs.h>
#include <zmq.hpp>
#include <zmq_addon.hpp>

namespace ZmqPostman {

/**
 * @brief Adapter between a ZeroMQ multipart message and Core::Message
 */
class Message : public zmq::multipart_t {
public:
    /**
     * @brief Request/response body definition
     */
    using Body = std::unordered_map<std::string, std::string>;

    Message() = default;
    /**
     * @brief Constructs ZeroMQ message from Core::Message
     * @param msg reference to Core::Message instance
     */
    explicit Message(const Core::Message& msg);
    /// @copydoc Message::Message(const Core::Message&)
    explicit Message(const std::unique_ptr<Core::Message>& msg);

    /**
     * @brief Creates a Core::Message from the ZeroMQ one if a corresponding
     * factory exists.
     * @param factories reference to the Message factories
     * @return pointer to the created message
     * @throws Core::Exception::InvalidArgument if the ZeroMQ message is
     * malformed
     * @throws Core::Exception::NotFound if the ZeroMQ message does not have a
     * matching factory
     */
    std::unique_ptr<Core::Message> parse(const Factories& factories);

    /**
     * @brief Helper function which matches entity type to its textual
     * representation
     * @param text textual representation of the entity
     * @return entity type
     * @throws Core::Exception::InvalidArgument if the entity given is invalid
     */
    static Core::Message::EntityType matchEntityType(const std::string& text);
};

}

#endif // ZMQ_POSTMAN_MESSAGE_H
