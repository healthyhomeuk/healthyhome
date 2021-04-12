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

#include <iostream>
#include <si1145/VisibleMessage.h>
#include <zmq-postman/Postman.h>

using namespace SI1145;

static void serializer(const VisibleMessage& self, void* payload)
{
    auto* msgs = ZmqPostman::MessageBody::castPayload(payload);
    msgs->putTagged("value", self.value);
}

static void deserializer(VisibleMessage&, const void*) { }

static Core::StatusCode setup = [] {
    VisibleMessage::SERIALIZER   = serializer;
    VisibleMessage::DESERIALIZER = deserializer;
    return Core::SUCCESS;
}();