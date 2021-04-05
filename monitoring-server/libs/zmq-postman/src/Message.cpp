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

#include <core/Message.h>
#include <core/exceptions.h>
#include <zmq-postman/Message.h>
#include <zmq-postman/defs.h>

using namespace ZmqPostman;

Message::Message(const Core::Message& msg) : Message()
{
    auto [entityType, entityName] = msg.getEntity();

    auto subject = msg.getSubject();
    Body body;

    pushstr(ENTITY_TYPES[entityType]);
    if (entityType != Core::Message::SERVER) {
        addstr(entityName);
    }
    addstr(subject);

    msg.serialize(&body);

    for (auto const& [key, value] : body) {
        addstr(key);
        addstr(value);
    }
}

Message::Message(const std::unique_ptr<Core::Message>& msg) : Message(*msg) { }

std::unique_ptr<Core::Message> Message::parse(const Factories& factories)
{
    std::size_t headerSize = MIN_MESSAGE_HEADER_LENGTH;

    auto size = this->size();
    if (size < headerSize) {
        throw Core::Exception::InvalidArgument { "invalid request header" };
    }

    auto entityType = matchEntityType(popstr());

    auto entityName = std::string { "" };
    if (entityType != Core::Message::SERVER) {
        headerSize++;
        entityName = popstr();

        if (size < headerSize) {
            throw Core::Exception::InvalidArgument { "invalid request header" };
        }
    }

    auto subject  = popstr();
    auto identity = std::make_tuple(entityType, entityName, subject);

    Body body;
    auto bodySize = this->size();
    if (bodySize > 0) {
        if (bodySize % 2 != 0) {
            throw Core::Exception::InvalidArgument { "malformed request body" };
        }

        do {
            body.try_emplace(popstr(), popstr());
        } while (!empty());
    }

    try {
        auto message = factories.at(identity)();
        message->deserialize(&body);
        return message;
    } catch (const std::out_of_range& ex) {
        throw Core::Exception::NotFound { "request not recognised" };
    }
}

Core::Message::EntityType Message::matchEntityType(const std::string& text)
{
    for (auto& [type, typeText] : ENTITY_TYPES) {
        if (typeText == text)
            return type;
    }

    throw Core::Exception::InvalidArgument { "invalid entity type requested" };
}