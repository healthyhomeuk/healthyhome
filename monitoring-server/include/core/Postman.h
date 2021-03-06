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
 * @file core/Postman.h
 */

#ifndef CORE_POSTMAN_H
#define CORE_POSTMAN_H

#include <core/Message.h>

namespace Core {

    /**
     * @brief Interface to implement a postman.
     *
     * The postman is the facility that delivers messages within the
     * network to and from the monitoring server.
     */
    class Postman {
    public:
        /**
         * @brief Advertising method
         * @param message Message to advertise.
         * @return Status of the operation.
         */
        virtual StatusCode advertise(Message &message) = 0;

        /**
         * @brief Registers a Message::Factory method to generate incoming messages.
         * @param entity The recipient entity of the incoming message.
         * @param factory The pointer to a message factory method.
         * @return Status of the operation.
         * @retval SUCCESS If the message factory has been registered successfully.
         * @retval E_CONFLICT If a message factory with the recipient and subject was already registered.
         */
        virtual StatusCode registerMessageFactory(Message::Entity entity, Message::Factory *factory) = 0;

        /**
         * @brief Default deconstructor
         */
        virtual ~Postman() = default;
    };

}

#endif // CORE_POSTMAN_H
