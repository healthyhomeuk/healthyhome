if (UNIX)
    add_library(posix_timers)

    target_link_libraries(posix_timers
            PRIVATE
            Core
            project_warnings
            project_options
            rt)

    set_target_properties(posix_timers PROPERTIES LINKER_LANGUAGE CXX)

    target_include_directories(posix_timers PUBLIC include)

    target_include_directories(docs INTERFACE include)

    add_subdirectory(tests)
endif()