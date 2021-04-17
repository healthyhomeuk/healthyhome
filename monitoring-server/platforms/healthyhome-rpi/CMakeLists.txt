add_executable(healthyhome-rpi)

set_target_properties(healthyhome-rpi PROPERTIES OUTPUT_NAME "monitd")

target_sources(healthyhome-rpi
        PUBLIC
        include/bme680_defs.h
        src/messages/Devices.cpp
        src/messages/Sensors.cpp
        src/messages/bme680/CO2eMessage.cpp
        src/messages/bme680/HumidityMessage.cpp
        src/messages/bme680/IAQMessage.cpp
        src/messages/bme680/TemperatureMessage.cpp
        src/messages/si1145/UVMessage.cpp
        src/messages/si1145/VisibleMessage.cpp
        src/messages/sn-gcja5/PM25Message.cpp
        src/messages/sn-gcja5/PM100Message.cpp
        src/messages/sn-gcja5/StatusMessage.cpp
        src/bme680_defs.cpp
        src/main.cpp)

target_link_libraries(healthyhome-rpi
        PUBLIC
        BME680
        SI1145
        Core
        SN-GCJA5
        linux_i2c
        zmq_postman
        posix_timers
        event_queue

        project_warnings
        project_options)

target_include_directories(healthyhome-rpi PUBLIC include)

target_include_directories(docs INTERFACE include)

if (ENABLE_TESTING)
    add_executable(healthyhome-rpi_tests)

    set_target_properties(healthyhome-rpi_tests PROPERTIES LINKER_LANGUAGE CXX)

    target_link_libraries(healthyhome-rpi_tests
            PRIVATE
            Catch2::Catch2
            Core)

    add_test(NAME HealthyHomeRpiTests COMMAND healthyhome-rpi_tests)
endif()

install(TARGETS healthyhome-rpi RUNTIME DESTINATION /usr/local/bin COMPONENT monitd)
install(FILES monitd.service DESTINATION "/lib/systemd/system" COMPONENT monitd)
install(DIRECTORY DESTINATION /var/run/monitd COMPONENT monitd)
install(DIRECTORY DESTINATION /var/lib/monitd COMPONENT monitd)

set(CPACK_GENERATOR "DEB")

set(CPACK_PACKAGE_VERSION_MAJOR "1")
set(CPACK_PACKAGE_VERSION_MINOR "0")
set(CPACK_PACKAGE_VERSION_PATCH "0")

set(CPACK_DEBIAN_PACKAGE_MAINTAINER "HealthyHome")
include(CPack)

cpack_add_component_group(monitd)
cpack_add_component(monitd
        REQUIRED
        DISPLAY_NAME "HealthyHome Monitoring Server"
        GROUP monitd
        INSTALL_TYPES Full)