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

#include <bme680/Device.h>
#include <bme680_defs.h>
#include <core/Server.h>
#include <core/events/StopServer.h>
#include <evtq/Scheduler.h>
#include <linux-i2c/Driver.h>
#include <posix-timers/Factory.h>
#include <si1145/Device.h>
#include <sn-gcja5/Device.h>
#include <unistd.h>
#include <zmq-postman/Postman.h>

static LinuxI2C::Driver i2c;
static EvtQ::Scheduler scheduler { 2 };
static ZmqPostman::Postman postman { {
    "ipc:///var/run/monitd/broadcast.sock",
    "ipc:///var/run/monitd/endpoint.sock",
    scheduler,
} };
static PosixTimers::Factory timersFactory { scheduler };

static BME680::Device bme680 { BME680::Configuration {
    BME680::SECONDARY,
    0.0F,
    bsec_config_iaq,
    BSEC_CONFIG_IAQ_LENGTH,
    &delay_us,
    &loadState,
    &saveState,
    &getTimestamp,
    i2c,
    std::bind(&PosixTimers::Factory::makeTimer, timersFactory),
    postman,
} };

static SNGCJA5::Device sngcja5 {
    { i2c, std::bind(&PosixTimers::Factory::makeTimer, timersFactory), postman }
};

static SI1145::Device si1145 {
    { i2c,
      std::bind(&PosixTimers::Factory::makeTimer, timersFactory),
      postman,
      &usleep }
};

void signalHandler(int)
{
    std::unique_ptr<Core::Event> event
        = std::make_unique<Core::Events::StopServer>();
    scheduler.push(std::move(event));
}

int main()
{
    auto res = Core::SUCCESS;
    signal(SIGINT, signalHandler);
    signal(SIGTERM, signalHandler);

    res = i2c.open(1);
    assert(res == Core::SUCCESS);

    postman.setup();

    auto config = new Core::Server::Configuration {
        scheduler,
        postman,
        { { "bme680", bme680 }, { "sn-gcja5", sngcja5 }, { "si1145", si1145 } }
    };
    Core::Server::setup(std::unique_ptr<Core::Server::Configuration>(config));

    Core::Server::start();

    return 0;
}