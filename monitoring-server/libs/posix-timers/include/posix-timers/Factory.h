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
 * @file posix-timers/Factory.h
 */

#ifndef POSIX_TIMERS_FACTORY_H
#define POSIX_TIMERS_FACTORY_H

extern "C" {
#include <csignal>
}

#include <memory>

#include <core/EventScheduler.h>
#include <posix-timers/Timer.h>

namespace PosixTimers {
    /**
     * @brief Timer Factory class
     * @headerfile posix-timers/Factory.h <posix-timers/Factory.h>
     *
     * POSIX timers cannot be created directly but they need to be
     * bound to a specific POSIX signal. The Factory class provides
     * a way to make timers based on its configuration.
     *
     * Example:
     * @code{.cpp}
     * PosixTimers::Factory timersFactory{
     *      scheduler, // server scheduler, required to push timer events
     *      SIGRTMIN   // lowest signal of the Real-time signal range,
     *                 // this may be any value from SIGRTMIN up to
     *                 // SIGRTMAX.
     * };
     *
     * auto timer = timersFactory.makeTimer();
     * @endcode
     */
    class Factory {
    friend class Timer;
    private:
        int signalId;
        Core::EventScheduler &scheduler;

        static void signalHandler(int sig, siginfo_t *si, void *ctx);
    public:
        Factory() = delete;

        /**
         * @param scheduler Server event scheduler
         * @param signalId Real-time signal id (must be between SIGRTMIN and SIGRTMAX)
         */
        explicit Factory(Core::EventScheduler &scheduler, int signalId = SIGRTMIN);

        /**
         * @brief Core::Timer::Factory function to make a new timer
         * @return Smart unique pointer to a Timer object
         */
        std::unique_ptr<Timer> makeTimer();
    };
}

#endif // POSIX_TIMERS_FACTORY_H
