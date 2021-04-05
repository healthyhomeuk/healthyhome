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
 * @file core/Message.h
 */

#ifndef CORE_MESSAGE_H
#define CORE_MESSAGE_H

#include <core/defs.h>
#include <string>

namespace Core {

/**
 * @brief Message interface for the Postman messages.
 * @headerfile core/Message.h <core/Message.h>
 *
 * The operation is similar to Core::Comms::Packet. Check its
 * example for usage. The only difference is characterised by
 * the serialization/deserialization that may accept any kind
 * of data instead of just bytes, and the extra fields.
 */
class Message {
public:
    /**
     * @brief Communication entity type.
     */
    enum EntityType {
        SERVER, ///< Server entity
        DEVICE, ///< Device entity
        SENSOR, ///< Sensor entity
    };

    /**
     * @brief Definition of a message entity.
     */
    using Entity = std::pair<EntityType, std::string>;

    /**
     * @brief Definition of a message factory.
     *
     * This method enables the Postman to envelope all the incoming
     * messages into the correct Message-implementing class.
     */
    using Factory = Message&();

    /**
     * @brief Getter that returns the sending/receiving
     *        entity identifier.
     *
     * This is required when advertising messages and to identify
     * the expected recipient of a Message for incoming messages.
     *
     * @return A pair containing the entity type and the entity
     *         identifier.
     */
    virtual Entity getEntity() = 0;

    /**
     * @brief Getter that returns the subject
     */
    virtual std::string getSubject() = 0;

    /**
     * @brief Getter that returns size in bytes of the payload
     */
    virtual size_t getPayloadSize() = 0;

    /**
     * @brief Deserialization method
     *
     * @warning The implementation of this method is Postman-dependent,
     *          which means that the Postman implementation should also
     *          implement the deserialization methods for all the server
     *          Messages.
     *
     * This method is meant to read a payload of a commonly known type
     * and convert its values to the Message's corresponding ones.
     *
     * @param payload The payload to deserialize the Message from.
     */
    virtual void deserialize(const void* payload) = 0;

    /**
     * @brief Serialization method
     *
     * @warning The implementation of this method is Postman-dependent,
     *          which means that the Postman implementation should also
     *          implement the serialization methods for all the server
     *          Messages.
     *
     * This method is meant to write all of the Message data to the
     * given payload pointer of a commonly known type.
     *
     * @param payload The payload to serialize the Message to.
     */
    virtual void serialize(void* payload) const = 0;

    /**
     * @brief Default deconstructor
     */
    virtual ~Message() = default;
};

}

#endif // CORE_MESSAGE_H
