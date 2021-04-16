add_library(bme68x)

target_sources(bme68x
        PUBLIC
        vendor/bme68x/bme68x_defs.h
        vendor/bme68x/bme68x.h
        vendor/bme68x/bme68x.c)

set_target_properties(bme68x PROPERTIES LINKER_LANGUAGE C)
set_target_properties(bme68x PROPERTIES C_STANDARD 11)

target_include_directories(bme68x PUBLIC vendor/bme68x)

add_library(BME680)

target_sources(BME680
        PUBLIC
        include/bme680/AdapterPacket.h
        include/bme680/BSECSensor.h
        include/bme680/BSECSensorMessage.h
        include/bme680/CO2eMessage.h
        include/bme680/defs.h
        include/bme680/Device.h
        include/bme680/HumidityMessage.h
        include/bme680/IAQMessage.h
        include/bme680/TemperatureMessage.h
        src/BSECSensor.cpp
        src/Device.cpp)

target_include_directories(BME680 PUBLIC include)

target_link_libraries(BME680
        PUBLIC
        Core
        bme68x
        project_warnings
        project_options
        PRIVATE
        m
        algobsec)

set_target_properties(BME680 PROPERTIES LINKER_LANGUAGE CXX)

target_include_directories(docs INTERFACE include)

add_subdirectory(tests)