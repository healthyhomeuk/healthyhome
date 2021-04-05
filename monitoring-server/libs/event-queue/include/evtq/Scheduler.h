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

#ifndef EVENT_QUEUE_SCHEDULER_H
#define EVENT_QUEUE_SCHEDULER_H

#include <atomic>
#include <concurrentqueue.h>
#include <condition_variable>
#include <core/EventScheduler.h>
#include <mutex>

namespace EvtQ {

/**
 * @brief Queue-based event scheduler
 *
 * A lock-free implementation of a queue-based event scheduler with
 * built-in possibility of running multiple workers concurrently.
 */
class Scheduler : public Core::EventScheduler {
public:
    /**
     * @brief Scheduler constructor
     * @param threads number of workers to run, defaults to 1.
     */
    explicit Scheduler(unsigned int threads = 1);

    Core::StatusCode push(std::unique_ptr<Core::Event> event) override;
    Core::StatusCode start() override;
    Core::StatusCode stop() override;

private:
    unsigned int num_threads;

    std::atomic<bool> running = false;
    moodycamel::ConcurrentQueue<std::unique_ptr<Core::Event>> queue;
    std::condition_variable semaphore;

    void runWorker();
};

}

#endif // EVENT_QUEUE_SCHEDULER_H
