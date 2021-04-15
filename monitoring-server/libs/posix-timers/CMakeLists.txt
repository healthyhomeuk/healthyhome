if (UNIX)
    add_library(posix_timers)

    target_sources(posix_timers
            PUBLIC
            include/posix-timers/Factory.h
            include/posix-timers/Timer.h

            src/Factory.cpp
            src/Timer.cpp)

    target_link_libraries(posix_timers
            PUBLIC
            Core
            project_warnings
            project_options
            PRIVATE
            rt)

    set_target_properties(posix_timers PROPERTIES LINKER_LANGUAGE CXX)

    target_include_directories(posix_timers PUBLIC include)

    target_include_directories(docs INTERFACE include)

    add_subdirectory(tests)
endif()