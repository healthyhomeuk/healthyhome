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
 * @file posix-timers/Timer.h
 */

#ifndef POSIX_TIMERS_TIMER_H
#define POSIX_TIMERS_TIMER_H

extern "C" {
#include <ctime>
}

#include <core/Timer.h>
#include <posix-timers/Factory.h>

namespace PosixTimers {

class Factory;

/**
 * @brief Posix Timer class
 * @headerfile posix-timers/Timer.h <posix-timers/Timer.h>
 *
 * Posix Timer class implementing the Core::Timer abstract class.
 * This class provides full timer functionality based off the POSIX
 * API.
 */
class Timer : public Core::Timer {
    friend class PosixTimers::Factory;

private:
    timer_t timerId;
    int interval_s  = 0;
    int interval_ns = 0;
    bool running    = false;

    Core::Timer::Callback cb;

    explicit Timer(PosixTimers::Factory& factory);
    PosixTimers::Factory& factory;

public:
    Timer() = delete;

    Core::StatusCode setup() override;
    Core::StatusCode remove() override;

    Core::StatusCode trigger() override;

    int getInterval() override;
    Core::StatusCode setInterval(int interval) override;

    Core::StatusCode setCallback(Core::Timer::Callback callback) override;

    ~Timer() override;
};

}

#endif // POSIX_TIMERS_TIMER_H
