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
 * @file core/events/MessageDelivery.h
 */

#ifndef CORE_EVENTS_MESSAGE_DELIVERY_H
#define CORE_EVENTS_MESSAGE_DELIVERY_H

#include <core/defs.h>
#include <core/Event.h>
#include <core/Message.h>

namespace Core::Events {

    /**
     * @brief MessageDelivery event
     */
    class MessageDelivery : Event {
        Message &message;
    public:
        /**
         * @brief MessageDelivery event constructor
         * @param message Reference to the message that has been received
         */
        explicit MessageDelivery(Message &message);

        StatusCode process() override;
    };

}

#endif // CORE_EVENTS_MESSAGE_DELIVERY_H
