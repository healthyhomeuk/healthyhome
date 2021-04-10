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
#include <sn-gcja5/StatusMessage.h>
#include <zmq-postman/Postman.h>

using namespace SNGCJA5;

static void serializer(const StatusMessage& self, void* payload)
{
    auto* msgs = ZmqPostman::MessageBody::castPayload(payload);
    msgs->putTagged("sensor", self.sensor);
    msgs->putTagged("ld", self.ld);
    msgs->putTagged("pd", self.pd);
    msgs->putTagged("fan", self.fan);
}

static void deserializer(StatusMessage&, const void* payload)
{
    auto* msgs = ZmqPostman::MessageBody::castPayload(payload);
    msgs->assertSizeIs(0, "unexpected request body");
}

static Core::StatusCode setup = [] {
    StatusMessage::SERIALIZER   = serializer;
    StatusMessage::DESERIALIZER = deserializer;
    return Core::SUCCESS;
}();