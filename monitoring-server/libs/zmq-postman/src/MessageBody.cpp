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

#include <core/exceptions.h>
#include <zmq-postman/MessageBody.h>

using namespace ZmqPostman;
using Core::Exception::InvalidArgument;

void MessageBody::putTagged(std::string key, int value)
{
    this->insert({ std::move(key), "integer:" + std::to_string(value) });
}

void MessageBody::putTagged(std::string key, float value)
{
    this->insert({ std::move(key), "decimal:" + std::to_string(value) });
}

void MessageBody::putTagged(std::string key, double value)
{
    this->insert({ std::move(key), "decimal:" + std::to_string(value) });
}

void MessageBody::putTagged(std::string key, bool value)
{
    std::string str = value ? "true" : "false";
    this->insert({ std::move(key), "boolean:" + str });
}

void MessageBody::put(std::string key, std::string value)
{
    this->insert({ std::move(key), value });
}

std::string MessageBody::get(const std::string& key) const
{
    try {
        return this->at(key);
    } catch (const std::out_of_range&) {
        throw InvalidArgument { "expected field '" + key + "'" };
    }
}

int MessageBody::getInteger(const std::string& key) const
{
    try {
        return std::stoi(get(key));
    } catch (const std::invalid_argument&) {
        throw InvalidArgument { "invalid integer field '" + key + "'" };
    }
}

float MessageBody::getFloat(const std::string& key) const
{
    try {
        return std::stof(get(key));
    } catch (const std::invalid_argument&) {
        throw InvalidArgument { "invalid decimal field '" + key + "'" };
    }
}

double MessageBody::getDouble(const std::string& key) const
{
    try {
        return std::stod(get(key));
    } catch (const std::invalid_argument&) {
        throw InvalidArgument { "invalid decimal field '" + key + "'" };
    }
}

bool MessageBody::getBoolean(const std::string& key) const
{
    auto value = get(key);
    if (value == "true") {
        return true;
    } else if (value == "false") {
        return false;
    } else {
        throw InvalidArgument { "invalid boolean field '" + key + "'" };
    }
}

void MessageBody::assertSizeIs(size_t length, const std::string& msg) const
{
    if (this->size() != length) {
        throw Core::Exception::InvalidArgument { msg };
    }
}

MessageBody* MessageBody::castPayload(void* payload)
{
    return static_cast<MessageBody*>(payload);
}

const MessageBody* MessageBody::castPayload(const void* payload)
{
    return static_cast<const MessageBody*>(payload);
}