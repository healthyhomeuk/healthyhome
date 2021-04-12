
add_library(SI1145)

target_sources(SI1145
        PUBLIC
        include/si1145/defs.h
        include/si1145/Device.h
        include/si1145/UVCoefficientPacket.h
        include/si1145/UVMessage.h
        include/si1145/UVSensor.h
        include/si1145/VisibleMessage.h
        include/si1145/VisibleSensor.h

        src/Device.cpp
        src/UVSensor.cpp
        src/VisibleSensor.cpp)

target_link_libraries(SI1145
        PRIVATE
        Core
        project_warnings
        project_options)

set_target_properties(SI1145 PROPERTIES LINKER_LANGUAGE CXX)

target_include_directories(SI1145 PUBLIC include)

target_include_directories(docs INTERFACE include)

add_subdirectory(tests)