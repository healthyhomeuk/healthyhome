
add_library(Core)

target_sources(Core
        PUBLIC
        include/core/defs.h
        include/core/Event.h
        include/core/EventScheduler.h
        include/core/Message.h
        include/core/Postman.h
        include/core/Sensor.h)

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