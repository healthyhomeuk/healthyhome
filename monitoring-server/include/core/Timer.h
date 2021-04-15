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
#include <functional>
#include <memory>

namespace Core {
/**
 * @brief Interface to implement the timer functionality
 * @headerfile core/Timer.h <core/Timer.h>
 */
class Timer {
public:
    /**
     * @brief Definition of a timer factory
     */
    using Factory = std::function<std::unique_ptr<Timer>()>;

    /**
     * @brief Definition of a timer callback
     */
    using Callback = std::function<StatusCode()>;

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
     * @brief Setter for the time interval.
     * @param interval Interval in seconds
     * @param oneTimeOnly Should timer run once only? Default: false
     * @return Status operation code.
     */
    virtual StatusCode setInterval(int interval, bool oneTimeOnly = false) = 0;

    /**
     * @brief Setter for the timer callback.
     * @param cb The callback that is called for every timer trigger.
     * @return Status operation code.
     */
    virtual StatusCode setCallback(Callback cb) = 0;

    /**
     * @brief Default deconstructor
     */
    virtual ~Timer() = default;
};

}

#endif // CORE_TIMER_H
