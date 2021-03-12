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

extern "C" {
#include <cstdlib>
#include <unistd.h>
#include <cstdio>
#include <csignal>
#include <pthread.h>
#include <cerrno>
}

#include <posix-timers/Factory.h>
#include <posix-timers/Timer.h>

using namespace PosixTimers;

constexpr int MILLI = 1e3;
constexpr int MICRO = 1e6;

int setTime(timer_t tid, int s, int ns)
{
    struct itimerspec in;
    in.it_value.tv_sec = s;
    in.it_value.tv_nsec = ns;
    in.it_interval.tv_sec = s;
    in.it_interval.tv_nsec = ns;

    return timer_settime(tid, 0, &in, nullptr);
}

Timer::Timer(PosixTimers::Factory &_factory)
    : factory(_factory)
{
    struct sigevent sig;
    sig.sigev_value.sival_ptr = this;
    sig.sigev_signo = factory.signalId;
    sig.sigev_notify = SIGEV_SIGNAL;

    timer_create(CLOCK_REALTIME, &sig, &timerId);
}

Timer::~Timer()
{
    timer_delete(timerId);
}

Core::StatusCode Timer::setCallback(Core::Timer::Callback callback)
{
    cb = callback;
    return Core::SUCCESS;
}

Core::StatusCode Timer::setInterval(int _interval)
{
    if (_interval <= 0) {
        return Core::E_PARAMS;
    }

    int ns = (_interval % MILLI) * MICRO;
    int s  = _interval / MILLI;

    if (running) {
        int res = setTime(timerId, s, ns);
        if (res != 0) {
            return Core::E_GENERIC;
        }
    }

    interval_ns = ns;
    interval_s  = s;

    return Core::SUCCESS;
}

int Timer::getInterval()
{
    return (interval_ns / MICRO) + (interval_s * MILLI);
}

Core::StatusCode Timer::remove()
{
    if (!running) {
        return Core::E_CONFLICT;
    }

    int res = setTime(timerId, 0, 0);
    if (res != 0) {
        return Core::E_GENERIC;
    }

    running = false;
    return Core::SUCCESS;
}

Core::StatusCode Timer::setup()
{
    if (running) {
        return Core::E_CONFLICT;
    }

    if (cb == nullptr) {
        return Core::E_PARAMS;
    }

    int res = setTime(timerId, interval_s, interval_ns);
    if (res != 0) {
        return Core::E_GENERIC;
    }

    running = true;
    return Core::SUCCESS;
}

inline Core::StatusCode Timer::trigger()
{
    return cb();
}
