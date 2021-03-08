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

#include <memory>
#include <stdexcept>

#include <core/events/TimerTrigger.h>
#include <posix-timers/Factory.h>

using namespace PosixTimers;

Factory::Factory(Core::EventScheduler &_scheduler, int _signalId)
    : signalId(_signalId), scheduler(_scheduler)
{
    if (_signalId < SIGRTMIN || _signalId > SIGRTMAX) {
        throw std::invalid_argument("received invalid signal id");
    }

    struct sigaction sa = {};
    sa.sa_flags = SA_SIGINFO;
    sa.sa_sigaction = signalHandler;
    sigemptyset(&sa.sa_mask);
    sigaction(_signalId, &sa, nullptr);
}

void Factory::signalHandler(int sig, siginfo_t *si, void *ctx)
{
    (void)sig;
    (void)ctx;

    if (si->si_value.sival_ptr == nullptr) {
        // todo: catch error!
        return;
    }

    auto *timer = static_cast<Timer *>(si->si_value.sival_ptr);

    std::unique_ptr<Core::Event> event = std::make_unique<Core::Events::TimerTrigger>(*timer);
    timer->factory.scheduler.push(std::move(event));
}

std::unique_ptr<Timer> Factory::makeTimer() {
    return std::unique_ptr<Timer>(new Timer(*this));
}