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
 * @file core/Server.h
 */

#ifndef CORE_SERVER_H
#define CORE_SERVER_H

#include <unordered_map>
#include <string>

#include <core/defs.h>
#include <core/Device.h>
#include <core/EventScheduler.h>
#include <core/Postman.h>

namespace Core {

    /**
     * @brief The monitoring server main class
     * @headerfile core/Server.h <core/Server.h>
     *
     * The Server class is the entrypoint for the monitoring server as
     * its operation is to combine all the resources together creating
     * therefore a server.
     *
     * @warning The Server class is implemented as a singleton, meaning
     * that only one instance can exist.
     *
     * Example usage:
     * @code{.cpp}
     * int main() {
     *     Core::Server::setup({
     *         .devices = {
     *             {"bme680", BME680::BME680(config)},
     *             // other sensorial devices to use
     *         },
     *         .postman = MQTTPostman(),
     *         .scheduler = POSIXScheduler(),
     *     });
     *     Core::Server::start();
     * }
     * @endcode
     */
    class Server {
    public:
        /**
         * @brief Server configuration struct
         *
         * When the server is initialised it also requires a configuration
         * to be passed with the essential working components that allow
         * it to function.
         */
        struct Configuration {
            /**
             * Reference to a scheduler implementing the EventScheduler interface.
             */
            EventScheduler &scheduler;

            /**
             * Reference to a postman implementing the Postman interface.
             */
            Postman &postman;

            /**
             * Map containing a reference of the system devices implementing
             * the Device interface. It also requires a key to identify the
             * device. A key example is the device name.
             */
            std::unordered_map<std::string, Device &> devices;
        };

        /**
         * @brief Setup of the server.
         *
         * This method is essential for the server to properly work. By passing
         * the server configuration using its Configuration struct, the server
         * configures all of its resources, rendering it able to start up and
         * function as desired.
         *
         * @param config the Configuration struct containing a complete server
         *               configuration.
         * @return Whether the setup was successful or not.
         */
        static StatusCode setup(Configuration config);

        /**
         * @brief Server startup.
         *
         * @warning the setup of the server is required before the startup.
         *          Please use the Server::setup method for this.
         *
         * This method starts the server up blocking the current thread execution.
         * It would normally return only if the server has received a StopServer
         * event and the server stop process was successful.
         *
         * @return No return unless the server is stopped.
         */
        static StatusCode start();

        /**
         * @name Internal use methods
         * @brief These methods are intended for internal use only by the events.
         * @{
         */

        /**
         * @brief Halts the server execution.
         *
         * The idea behind this command is to gracefully stop the server,
         * when running for example under an operating system, which would
         * trigger a terminate signal.
         *
         * @return Status whether the server was successfully stopped gracefully or not.
         */
        static StatusCode stop();

        /**
         * @brief Handles an incoming message from the Postman.
         *
         * This internal method is specifically meant to provide
         * the Postman class with an entrypoint to handle any of
         * the incoming messages.
         *
         * @param message reference to an object implementing Message.
         *
         * @return Operation status code
         * @retval SUCCESS Success
         */
        static StatusCode handleMessage(Message &message);
        /**
         * @}
         */

        /**
         * @name Global registration methods
         * @brief These methods are meant to register resources to the server.
         * @{
         */

        /**
         * @brief Registers a sensor for incoming requests.
         * @param sensorId A sensor unique identifier.
         * @param sensor The Sensor reference.
         * @return Status of the operation.
         * @retval SUCCESS If the sensor has been registered successfully.
         * @retval E_CONFLICT If a sensor with the same identifier was already registered.
         */
        static StatusCode registerSensor(const char *sensorId, Sensor &sensor);

        /**
         * @brief Proxy method to Postman::registerMessageFactory
         *
         * Registers a Message::Factory method to generate incoming messages.
         *
         * @param entity The recipient entity of the incoming message.
         * @param factory The pointer to a message factory method.
         * @return Status of the operation.
         * @retval SUCCESS If the message factory has been registered successfully.
         * @retval E_CONFLICT If a message factory with the recipient and subject was already registered.
         */
        static StatusCode registerMessageFactory(Message::Entity entity, Message::Factory *factory);
        /**
         * @}
         */
    private:
        bool isSetup = false;
        Configuration config;

        Server() = default;

        static Server &getInstance();
    };

}

#endif // CORE_SERVER_H
