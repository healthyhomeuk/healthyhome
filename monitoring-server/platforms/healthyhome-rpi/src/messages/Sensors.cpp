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
#include <core/messages/Sensors.h>
#include <zmq-postman/Postman.h>

using namespace Core::Messages;

static void serializer(const Sensors& self, void* payload)
{
    auto msgs = ZmqPostman::Postman::castPayload(payload);

    std::string listOfSensors;

    for (std::vector<std::string>::const_iterator ptr
         = self.sensorsNames.begin();
         ptr != self.sensorsNames.end();
         ptr++) {
        listOfSensors += *ptr;

        if (ptr != (self.sensorsNames.end() - 1)) {
            listOfSensors += "\n";
        }
    }

    msgs["list"] = listOfSensors;
}

static void deserializer(Sensors&, const void* payload)
{
    auto msgs = ZmqPostman::Postman::castPayload(payload);
    if (msgs.size() != 0) {
        throw Core::Exception::InvalidArgument { "invalid request body" };
    }
}

static Core::StatusCode setup = [] {
    Sensors::SERIALIZER   = serializer;
    Sensors::DESERIALIZER = deserializer;
    return Core::SUCCESS;
}();