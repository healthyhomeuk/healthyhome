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
 * @file core/EventScheduler.h
 */

#ifndef CORE_EVENT_SCHEDULER_H
#define CORE_EVENT_SCHEDULER_H

#include <core/Event.h>

namespace Core {

    /**
     * @brief Interface required to be implemented for an event scheduler.
     * @headerfile core/EventScheduler.h <core/EventScheduler.h>
     *
     * The architecture of the server is event-based. What this means is
     * that every operation is dictated by events triggering. In order for
     * this to work, the server must be capable of scheduling the events
     * so that they can run properly. This is a platform-dependent operation
     * since on a Unix-based system can be implemented using the POSIX API,
     * or any embedded system may implement their own RTOS, e.g. FreeRTOS.
     *
     * Because of this the server requires the scheduling to be implemented
     * per-platform using the EventScheduler interface.
     */
    class EventScheduler {
    public:
        /**
         * @brief Push a new event to the scheduler.
         *
         * This essential operation allows to push new events
         * that require processing to the event scheduler.
         *
         * @return Status code of the operation.
         */
        virtual StatusCode push(Event &event) = 0;

        /**
         * @brief Scheduler startup method.
         *
         * This crucial method starts up the the event
         * scheduler. This operation is generally blocking,
         * though it will return if the scheduler is stopped.
         *
         * @return Status code of the operation.
         */
        virtual StatusCode start() = 0;

        /**
         * @brief Scheduler stop method.
         *
         * @return Status code of the operation.
         */
        virtual StatusCode stop() = 0;
    };

}

#endif // CORE_EVENT_SCHEDULER_H
