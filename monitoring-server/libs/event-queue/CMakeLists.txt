add_subdirectory(vendor/concurrentqueue)

add_library(event_queue)

target_sources(event_queue
        PUBLIC
        include/evtq/Scheduler.h
        src/Scheduler.cpp)

target_link_libraries(event_queue
        PUBLIC
        Core
        project_options
        project_warnings
        concurrentqueue)

set_target_properties(event_queue PROPERTIES LINKER_LANGUAGE CXX)

target_include_directories(event_queue PUBLIC include)

target_include_directories(docs INTERFACE include)