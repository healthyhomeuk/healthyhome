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

#include <core/Server.h>
#include <core/events/MessageDelivery.h>
#include <core/exceptions.h>
#include <zmq-postman/BadRequestMessage.h>
#include <zmq-postman/Message.h>
#include <zmq-postman/NotFoundMessage.h>
#include <zmq-postman/Postman.h>
#include <zmq.hpp>
#include <zmq_addon.hpp>

using namespace ZmqPostman;

Postman::Postman(Postman::Configuration _config) : config(_config)
{
    context      = zmq::context_t(1);
    broadcastSkt = zmq::socket_t(context, zmq::socket_type::pub);
    requestsSkt  = zmq::socket_t(context, zmq::socket_type::rep);
    delivered    = false;
}

Postman::~Postman()
{
    context.shutdown();
    endpointWorker.join();
}

void Postman::setup()
{
    broadcastSkt.bind(config.broadcastEndpoint);
    requestsSkt.bind(config.requestsEndpoint);
    endpointWorker = std::thread(&Postman::requestEndpoint, this);
}

void Postman::advertise(const Core::Message& message)
{
    try {
        if (!zmq::send_multipart(broadcastSkt, Message { message })) {
            throw std::exception {};
        }
    } catch (zmq::error_t& err) {
        throw std::exception {};
    }
}

void Postman::registerMessageFactory(
    Core::Message::Identity identity,
    Core::Message::Factory factory)
{
    auto [_, notExists] = factories.try_emplace(identity, factory);
    if (!notExists)
        throw Core::Exception::Conflict {
            "a factory already exists for this entity"
        };
}

void Postman::requestEndpoint()
{
    Message zmqMsg;

    try {
        for (;;) {
            if (zmq::recv_multipart(requestsSkt, std::back_inserter(zmqMsg))
                    .has_value()) {
                try {
                    auto request = zmqMsg.parse(factories);

                    auto fn = std::bind(
                        &Postman::deliverMessage,
                        this,
                        std::placeholders::_1);

                    delivered = false;
                    config.scheduler.push(
                        std::make_unique<Core::Events::MessageDelivery>(
                            fn,
                            std::move(request)));

                    {
                        std::unique_lock<std::mutex> lk(mt);
                        delivery.wait(
                            lk,
                            std::bind(&Postman::hasReplied, this));
                    }
                } catch (const Core::Exception::InvalidArgument& ex) {
                    zmq::send_multipart(
                        requestsSkt,
                        BadRequestMessage { ex.what() });
                } catch (const Core::Exception::NotFound& ex) {
                    zmq::send_multipart(
                        requestsSkt,
                        NotFoundMessage { ex.what() });
                }

                zmqMsg.clear();
            }
        }
    } catch (const zmq::error_t& err) {
        if (err.num() != ETERM) {
            throw err;
        }
    } catch (const std::exception& ex) {
        fprintf(stderr, "Unexpected error detected: %s", ex.what());
        throw ex;
    }
}

void Postman::deliverMessage(std::unique_ptr<Core::Message> message)
{
    try {
        auto res = Message { Core::Server::handleMessage(std::move(message)) };
        zmq::send_multipart(requestsSkt, res);
    } catch (const Core::Exception::InvalidArgument& ex) {
        zmq::send_multipart(requestsSkt, BadRequestMessage { ex.what() });
    } catch (const Core::Exception::NotFound& ex) {
        zmq::send_multipart(requestsSkt, NotFoundMessage { ex.what() });
    }

    delivered = true;
    delivery.notify_one();
}

bool Postman::hasReplied()
{
    return delivered;
}

Message::Body* Postman::castPayload(void* payload)
{
    return static_cast<ZmqPostman::Message::Body*>(payload);
}

const Message::Body* Postman::castPayload(const void* payload)
{
    return static_cast<const ZmqPostman::Message::Body*>(payload);
}