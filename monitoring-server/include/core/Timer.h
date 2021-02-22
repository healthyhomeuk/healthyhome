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
 * @file core/Timer.h
 */

#ifndef CORE_TIMER_H
#define CORE_TIMER_H

#include <core/defs.h>

namespace Core {
    /**
     * @brief Interface to implement the timer functionality
     * @headerfile core/Timer.h <core/Timer.h>
     */
    class Timer {
    public:
        /**
         * @brief Definition of a timer callback
         */
        using Callback = StatusCode();

        /**
         * @brief Sets the timer up and enables it.
         * @return Status operation code.
         */
        virtual StatusCode setup() = 0;

        /**
         * @brief Removes the timer
         * @return Status operation code.
         */
        virtual StatusCode remove() = 0;

        /**
         * @brief Callback trigger
         *
         * This method is meant for exclusive use to the TimerTrigger
         * event.
         *
         * @return Callback status operation code.
         */
        virtual StatusCode trigger() = 0;

        /**
         * @brief Getter for the time interval.
         * @return Time interval in seconds.
         */
        virtual int getInterval() = 0;

        /**
         * @brief Setter for the time interval in seconds.
         * @return Status operation code.
         */
        virtual StatusCode setInterval(int interval) = 0;

        /**
         * @brief Setter for the timer callback.
         * @param cb The callback that is called for every timer trigger.
         * @return Status operation code.
         */
        virtual StatusCode setCallback(Callback &cb) = 0;
    };

}

#endif // CORE_TIMER_H
