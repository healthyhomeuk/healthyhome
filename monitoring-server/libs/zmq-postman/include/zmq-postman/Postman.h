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

#ifndef ZMQ_POSTMAN_POSTMAN_H
#define ZMQ_POSTMAN_POSTMAN_H

#include <atomic>
#include <condition_variable>
#include <core/EventScheduler.h>
#include <core/Message.h>
#include <core/Postman.h>
#include <thread>
#include <zmq-postman/Message.h>
#include <zmq-postman/MessageBody.h>
#include <zmq-postman/defs.h>
#include <zmq.hpp>

namespace ZmqPostman {

/**
 * @brief ZeroMQ implementation of Core::Postman
 */
class Postman : public Core::Postman {
public:
    /**
     * @brief Configuration struct
     */
    struct Configuration {
        /// libzmq-valid endpoint for broadcasting messages.
        const char* broadcastEndpoint;
        /// libzmq-valid endpoint to accept request messages.
        const char* requestsEndpoint;
        /// Reference to the event scheduler
        Core::EventScheduler& scheduler;
    };

    /**
     * @brief ZeroMQ Postman constructor
     * @param config Configuration data structure
     */
    explicit Postman(Configuration config);

    /**
     * @brief Sets the postman up.
     */
    void setup();

    void advertise(const Core::Message& message) override;
    void registerMessageFactory(
        Core::Message::Identity identity,
        Core::Message::Factory factory) override;

    /**
     * @brief Function which delivers the message and handles the response.
     * @param message Incoming Message
     */
    void deliverMessage(std::unique_ptr<Core::Message> message) override;

    /**
     * @brief Deconstructor
     */
    ~Postman() override;

private:
    Configuration config;

    Factories factories;

    zmq::context_t context;
    zmq::socket_t broadcastSkt;
    zmq::socket_t requestsSkt;

    void requestEndpoint();

    std::thread endpointWorker;

    std::mutex mt;
    std::condition_variable delivery;
    std::atomic<bool> delivered;
    bool hasReplied();
};

}

#endif // ZMQ_POSTMAN_POSTMAN_H
