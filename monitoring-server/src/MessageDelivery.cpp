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

#include <core/events/MessageDelivery.h>

using namespace Core::Events;

MessageDelivery::MessageDelivery(
    DeliveryFn fn,
    std::unique_ptr<Message> _message) :
    deliver(std::move(fn)),
    message(std::move(_message))
{
}

Core::StatusCode MessageDelivery::process()
{
    deliver(std::move(message));
    return Core::SUCCESS;
}

Core::PriorityLevel MessageDelivery::getPriorityLevel() const
{
    return MEDIUM;
}