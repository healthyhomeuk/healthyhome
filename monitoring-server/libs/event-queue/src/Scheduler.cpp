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

#include <evtq/Scheduler.h>
#include <vector>

using namespace EvtQ;

Scheduler::Scheduler(unsigned int threads) : num_threads(threads) { }

Core::StatusCode Scheduler::push(std::unique_ptr<Core::Event> event)
{
    queue.enqueue(std::move(event));
    semaphore.notify_all();
    return Core::SUCCESS;
}

Core::StatusCode Scheduler::start()
{
    unsigned int idx;
    std::vector<std::thread> threads;
    threads.reserve(num_threads);

    running = true;

    for (idx = 0; idx < num_threads; idx++)
        threads.push_back(std::thread(&Scheduler::runWorker, this));

    for (idx = 0; idx < num_threads; idx++)
        threads[idx].join();

    return Core::SUCCESS;
}

void Scheduler::runWorker()
{
    std::mutex processing;
    std::unique_ptr<Core::Event> event;

    while (running) {
        std::unique_lock<std::mutex> lock(processing);
        event = nullptr;

        semaphore.wait(lock, [&] {
            return !running || queue.try_dequeue(event);
        });

        if (event != nullptr) {
            event->process();
        }
    }
}

Core::StatusCode Scheduler::stop()
{
    running = false;
    semaphore.notify_all();
    return Core::SUCCESS;
}
