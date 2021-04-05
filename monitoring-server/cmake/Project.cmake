
add_library(Core)

target_sources(Core
        PUBLIC
        include/core/comms/I2C.h
        include/core/comms/Packet.h
        include/core/events/MessageDelivery.h
        include/core/events/StopServer.h
        include/core/events/TimerTrigger.h
        include/core/messages/Devices.h
        include/core/messages/Sensors.h
        include/core/defs.h
        include/core/Device.h
        include/core/Event.h
        include/core/EventScheduler.h
        include/core/exceptions.h
        include/core/Log.h
        include/core/Message.h
        include/core/Postman.h
        include/core/Sensor.h
        include/core/Server.h
        include/core/Timer.h

        src/messages/Devices.cpp
        src/messages/Sensors.cpp
        src/MessageDelivery.cpp
        src/StopServer.cpp
        src/TimerTrigger.cpp)

target_link_libraries(Core
        PRIVATE
        project_warnings
        project_options)

set_target_properties(Core PROPERTIES LINKER_LANGUAGE CXX)

target_include_directories(Core
        PUBLIC
        include
        PRIVATE
        src)

target_include_directories(docs INTERFACE include)

add_subdirectory(tests)

add_subdirectory(libs)
add_subdirectory(platforms)