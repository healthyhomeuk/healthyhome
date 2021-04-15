
add_library(SN-GCJA5)

target_sources(SN-GCJA5
        PUBLIC
        include/sn-gcja5/defs.h
        include/sn-gcja5/DensityPacket.h
        include/sn-gcja5/Device.h
        include/sn-gcja5/ParticleCountPacket.h
        include/sn-gcja5/PM25Sensor.h
        include/sn-gcja5/PM100Sensor.h
        include/sn-gcja5/PMSensor.h
        include/sn-gcja5/PM25Message.h
        include/sn-gcja5/PM100Message.h
        include/sn-gcja5/StatusMessage.h
        include/sn-gcja5/StatusPacket.h

        src/Device.cpp
        src/PMSensor.cpp)

target_link_libraries(SN-GCJA5
        PUBLIC
        Core
        project_warnings
        project_options)

set_target_properties(SN-GCJA5 PROPERTIES LINKER_LANGUAGE CXX)

target_include_directories(SN-GCJA5 PUBLIC include)

target_include_directories(docs INTERFACE include)

add_subdirectory(tests)