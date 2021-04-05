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
#include <core/exceptions.h>
#include <core/messages/Devices.h>
#include <core/messages/Sensors.h>

using namespace Core;

std::unique_ptr<Message> Server::handleMessage(std::unique_ptr<Message> message)
{
    auto& config = getInstance().config;

    if (config == nullptr) {
        throw std::runtime_error { "the server is not setup" };
    }

    auto [type, name] = message->getEntity();
    switch (type) {
    case Message::SERVER:
        return getInstance().handleServerMessage(std::move(message));
    case Message::DEVICE:
        try {
            auto& device = config->devices.at(name);
            return device.handleMessage(std::move(message));
        } catch (const std::out_of_range& err) {
            throw Exception::NotFound { "device requested was not found" };
        }
    case Message::SENSOR:
        try {
            auto& sensor = getInstance().sensors.at(name);
            return sensor.handleMessage(std::move(message));
        } catch (const std::out_of_range& err) {
            throw Exception::NotFound { "sensor requested was not found" };
        }
    }
    throw std::runtime_error { "reached unreachable code" };
}

std::unique_ptr<Message> Server::handleServerMessage(
    std::unique_ptr<Message> message)
{
    auto subject = message->getSubject();

    // todo: could be improved with a proper routing system

    if (subject == Messages::Devices::SUBJECT) {
        return std::make_unique<Messages::Devices>(config->devices);
    }

    if (subject == Messages::Sensors::SUBJECT) {
        return std::make_unique<Messages::Sensors>(sensors);
    }

    throw Exception::NotFound { "the requested entity was not found" };
}

StatusCode Server::stop()
{
    if (getInstance().config == nullptr) {
        return Core::E_GENERIC;
    }

    return getInstance().config->scheduler.stop();
}

StatusCode Server::start()
{
    if (getInstance().config == nullptr) {
        return Core::E_GENERIC;
    }

    return getInstance().config->scheduler.start();
}

void Server::setup(std::unique_ptr<Configuration> _config)
{
    auto& config = getInstance().config;
    config       = std::move(_config);

    for (const auto& [_, device] : config->devices) {
        device.setup();
        for (const auto& [sensorName, sensor] : device.getSensors()) {
            Server::registerSensor(sensorName, sensor);
            sensor.setup();
        }
    }

    registerMessageFactory(
        Messages::Devices::IDENTITY,
        Messages::Devices::factory);
    registerMessageFactory(
        Messages::Sensors::IDENTITY,
        Messages::Sensors::factory);
}

Server::~Server()
{
    for (const auto& [_1, device] : config->devices) {
        for (const auto& [_2, sensor] : device.getSensors()) {
            sensor.halt();
        }

        device.halt();
    }
}

Server& Server::getInstance()
{
    static Server instance;
    return instance;
}

void Server::registerMessageFactory(
    Message::Identity entity,
    Message::Factory factory)
{
    getInstance().config->postman.registerMessageFactory(
        std::move(entity),
        std::move(factory));
}

void Server::registerSensor(std::string sensorId, Sensor& sensor)
{
    auto [_, notExists] = getInstance().sensors.try_emplace(sensorId, sensor);
    if (!notExists) {
        throw Exception::Conflict {
            "an omonymous sensor is already registered"
        };
    }
}
