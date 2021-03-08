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
 * @file core/events/TimerTrigger.h
 */

#ifndef CORE_EVENTS_TIMER_TRIGGER_H
#define CORE_EVENTS_TIMER_TRIGGER_H

#include <core/defs.h>
#include <core/Event.h>
#include <core/Timer.h>

namespace Core::Events {

    /**
     * @brief TimerTrigger event
     */
    class TimerTrigger : public Event {
        Timer &timer;

    public:
        /**
         * @brief TimerTrigger constructor
         * @param timer Reference to the timer that has been triggered
         */
        explicit TimerTrigger(Timer &timer);

        StatusCode process() override;

        PriorityLevel getPriorityLevel() override;
    };

}

#endif // CORE_EVENTS_TIMER_TRIGGER_H
