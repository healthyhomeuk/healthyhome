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

#include <sn-gcja5/PM100Message.h>
#include <zmq-postman/Postman.h>

using namespace SNGCJA5;

static void serializer(const PM100Message& self, void* payload)
{
    auto* msgs = ZmqPostman::MessageBody::castPayload(payload);
    msgs->putTagged("particleCount", self.particleCount);
    msgs->putTagged("density", self.density);
}

static void deserializer(PM100Message&, const void*) { }

static Core::StatusCode setup = [] {
    PM100Message::SERIALIZER   = serializer;
    PM100Message::DESERIALIZER = deserializer;
    return Core::SUCCESS;
}();