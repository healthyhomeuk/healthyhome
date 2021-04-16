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

#include <bme680/AdapterPacket.h>
#include <bme680/BSECSensor.h>
#include <bme680/Device.h>
#include <core/exceptions.h>

using namespace BME680;

Core::StatusCode Device::setup()
{
    bsec_library_return_t bsec_status = BSEC_OK;

    auto bme68x_res = bme68x_init(&device);
    if (bme68x_res != BME68X_OK) {
        return Core::E_GENERIC;
    }

    bsec_status = bsec_init();
    if (bsec_status != BSEC_OK) {
        return Core::E_GENERIC;
    }

    uint8_t workBuffer[BSEC_MAX_WORKBUFFER_SIZE] = { 0 };

    if (config.bsecConfigLength != 0) {
        bsec_status = bsec_set_configuration(
            config.bsecConfig,
            config.bsecConfigLength,
            workBuffer,
            BSEC_MAX_WORKBUFFER_SIZE);
        if (bsec_status != BSEC_OK) {
            return Core::E_GENERIC;
        }
    }

    size_t bsecStateLength
        = config.loadBSECState(bsecState, BSEC_MAX_STATE_BLOB_SIZE);
    if (bsecStateLength != 0) {
        bsec_status = bsec_set_state(
            bsecState,
            bsecStateLength,
            workBuffer,
            BSEC_MAX_WORKBUFFER_SIZE);
        if (bsec_status != BSEC_OK) {
            return Core::E_GENERIC;
        }
    }

    bsec_sensor_configuration_t requiredSensors[BSEC_MAX_PHYSICAL_SENSOR];
    uint8_t requiredSensorsSettings = BSEC_MAX_PHYSICAL_SENSOR;

    bsec_status = bsec_update_subscription(
        VIRTUAL_SENSORS,
        VIRTUAL_SENSORS_SIZE,
        requiredSensors,
        &requiredSensorsSettings);
    if (bsec_status != BSEC_OK) {
        return Core::E_GENERIC;
    }

    unsavedSamples = 0;

    timer = config.makeTimer();
    return nextStep(TRIGGER_MEASUREMENT);
}

Core::StatusCode Device::triggerMeasurement()
{
    int waitTime  = 1;
    lastTimestamp = config.getTimestamp();
    // Fetch desired configuration by BSEC
    bsec_sensor_control(lastTimestamp, &desiredConfig);

    // Trigger measurement if requested
    if (desiredConfig.trigger_measurement) {
        bme68x_conf sensorConfig;
        sensorConfig.os_temp = desiredConfig.temperature_oversampling;
        sensorConfig.os_hum  = desiredConfig.humidity_oversampling;
        sensorConfig.os_pres = desiredConfig.pressure_oversampling;
        sensorConfig.filter  = BME68X_FILTER_OFF;
        sensorConfig.odr     = BME68X_ODR_NONE;
        bme68x_set_conf(&sensorConfig, &device);

        bme68x_heatr_conf heaterConfig;
        heaterConfig.enable     = desiredConfig.run_gas;
        heaterConfig.heatr_temp = desiredConfig.heater_temperature;
        heaterConfig.heatr_dur  = desiredConfig.heating_duration;
        bme68x_set_heatr_conf(OPERATION_MODE, &heaterConfig, &device);

        bme68x_set_op_mode(OPERATION_MODE, &device);

        waitTime
            = bme68x_get_meas_dur(OPERATION_MODE, &sensorConfig, &device) / 1e3;
        if (waitTime < 1) {
            waitTime = 1;
        }
    }

    return nextStep(WAIT_UNTIL_READY, waitTime);
}

Core::StatusCode Device::waitUntilReady()
{
    uint8_t operationMode = OPERATION_MODE;

    bme68x_get_op_mode(&operationMode, &device);

    if (operationMode == OPERATION_MODE) {
        return nextStep(WAIT_UNTIL_READY, WAIT_UNTIL_READY_INTERVAL);
    }

    if (desiredConfig.process_data) {
        return nextStep(READ_NEW_DATA);
    }

    return nextStep(TRIGGER_MEASUREMENT, getNextCallTimeout());
}

Core::StatusCode Device::readNewData()
{
    inputsLength = 0;

    uint8_t newData = 0;
    bme68x_data sensorData;
    bme68x_get_data(OPERATION_MODE, &sensorData, &newData, &device);

    if (sensorData.status & BME68X_NEW_DATA_MSK) {
        if (desiredConfig.process_data & BSEC_PROCESS_TEMPERATURE) {
#ifdef BME68X_USE_FPU
            addBSECInput(BSEC_INPUT_TEMPERATURE, sensorData.temperature);
#else
            addBSECInput(
                BSEC_INPUT_TEMPERATURE,
                sensorData.temperature / 100.0f);
#endif
            addBSECInput(BSEC_INPUT_HEATSOURCE, config.temperatureOffset);
        }

        if (desiredConfig.process_data & BSEC_PROCESS_HUMIDITY) {
#ifdef BME68X_USE_FPU
            addBSECInput(BSEC_INPUT_HUMIDITY, sensorData.humidity);
#else
            addBSECInput(BSEC_INPUT_HUMIDITY, sensorData.humidity / 1000.0f);
#endif
        }

        if (desiredConfig.process_data & BSEC_PROCESS_PRESSURE) {
            addBSECInput(BSEC_INPUT_PRESSURE, sensorData.pressure);
        }

        if ((desiredConfig.process_data & BSEC_PROCESS_GAS)
            && (sensorData.status & BME68X_GASM_VALID_MSK)) {
            addBSECInput(BSEC_INPUT_GASRESISTOR, sensorData.gas_resistance);
        }

        if (inputsLength > 0) {
            return nextStep(PROCESS_DATA);
        }
    }

    return nextStep(TRIGGER_MEASUREMENT, getNextCallTimeout());
}

Core::StatusCode Device::processData()
{
    outputsLength = BSEC_NUMBER_OUTPUTS;
    bsec_do_steps(inputs, inputsLength, outputs, &outputsLength);

    for (int idx = 0; idx < outputsLength; idx++) {
        BSECSensor* sensor = nullptr;

        switch (outputs[idx].sensor_id) {
        case BSEC_OUTPUT_SENSOR_HEAT_COMPENSATED_TEMPERATURE:
            sensor = &tempSensor;
            break;
        case BSEC_OUTPUT_SENSOR_HEAT_COMPENSATED_HUMIDITY:
            sensor = &humSensor;
            break;
        case BSEC_OUTPUT_IAQ:
            sensor = &iaqSensor;
            break;
        case BSEC_OUTPUT_CO2_EQUIVALENT:
            sensor = &co2eSensor;
            break;
        default:
            continue;
        }

        sensor->setValue(outputs[idx].signal);
        sensor->setValueAccuracy(
            static_cast<SensorValueAccuracy>(outputs[idx].accuracy));
        auto msg = sensor->generateMessage();
        config.postman.advertise(*msg);
    }

    if ((unsavedSamples++) > SAVE_INTERVAL) {
        return nextStep(SAVE_STATE);
    }

    return nextStep(TRIGGER_MEASUREMENT, getNextCallTimeout());
}

void Device::addBSECInput(uint8_t sensorId, float signal)
{
    inputs[inputsLength].sensor_id  = sensorId;
    inputs[inputsLength].signal     = signal;
    inputs[inputsLength].time_stamp = lastTimestamp;
    inputsLength++;
}

Core::StatusCode Device::saveBSECState()
{
    uint8_t workBuffer[BSEC_MAX_WORKBUFFER_SIZE] = { 0 };

    uint32_t bsecStateLength = 0;
    bsec_get_state(
        0,
        bsecState,
        sizeof(bsecState),
        workBuffer,
        sizeof(workBuffer),
        &bsecStateLength);

    config.saveBSECState(bsecState, bsecStateLength);

    unsavedSamples = 0;

    return nextStep(TRIGGER_MEASUREMENT, getNextCallTimeout());
}

int Device::getNextCallTimeout()
{
    int sleepTime = (desiredConfig.next_call - config.getTimestamp()) / 1e6;
    return sleepTime > 0 ? sleepTime : 1;
}

Core::StatusCode Device::nextStep(SensorState nextState, int timeout)
{
    timer->setInterval(timeout, true);

    switch (nextState) {
    case TRIGGER_MEASUREMENT:
        timer->setCallback(std::bind(&Device::triggerMeasurement, this));
        break;
    case WAIT_UNTIL_READY:
        timer->setCallback(std::bind(&Device::waitUntilReady, this));
        break;
    case READ_NEW_DATA:
        timer->setCallback(std::bind(&Device::readNewData, this));
        break;
    case PROCESS_DATA:
        timer->setCallback(std::bind(&Device::processData, this));
        break;
    case SAVE_STATE:
        timer->setCallback(std::bind(&Device::saveBSECState, this));
    }

    return timer->setup();
}

Core::StatusCode Device::halt()
{
    return saveBSECState();
}

std::unordered_map<std::string, Core::Sensor&> Device::getSensors()
{
    return { { "temp", tempSensor },
             { "hum", humSensor },
             { "iaq", iaqSensor },
             { "co2e", co2eSensor } };
}

std::unique_ptr<Core::Message> Device::handleMessage(
    std::unique_ptr<Core::Message>)
{
    throw Core::Exception::NotFound { "the requested entity was not found" };
}

Device::Device(Configuration _config) : config(std::move(_config))
{
    device.intf     = BME68X_I2C_INTF;
    device.intf_ptr = &config;
    device.write    = Device::i2cWrite;
    device.read     = Device::i2cRead;

    device.delay_us = config.delay_us;
}

const char* Device::getName()
{
    return "bme680";
}

BME68X_INTF_RET_TYPE Device::i2cWrite(
    uint8_t reg_addr,
    const uint8_t* reg_data,
    uint32_t length,
    void* intf_ptr)
{
    auto* config = static_cast<Configuration*>(intf_ptr);
    AdapterPacket pck { reg_data, length };
    return config->i2c.write(config->i2cAddr, reg_addr, pck);
}

BME68X_INTF_RET_TYPE Device::i2cRead(
    uint8_t reg_addr,
    uint8_t* reg_data,
    uint32_t length,
    void* intf_ptr)
{
    auto* config = static_cast<Configuration*>(intf_ptr);
    AdapterPacket pck { reg_data, length };
    return config->i2c.read(config->i2cAddr, reg_addr, pck);
}
