add_executable(healthyhome-rpi)

target_sources(healthyhome-rpi
        PUBLIC
        src/messages/Devices.cpp
        src/messages/Sensors.cpp
        src/main.cpp)

target_link_libraries(healthyhome-rpi
        PRIVATE

        Core
        BME680
        SI1145
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