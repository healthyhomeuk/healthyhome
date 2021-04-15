if (CMAKE_SYSTEM_NAME STREQUAL "Linux")
    add_library(linux_i2c)

    target_sources(linux_i2c
            PUBLIC
            include/linux-i2c/Driver.h

            src/Driver.cpp)

    target_link_libraries(linux_i2c
            PUBLIC
            Core
            project_warnings
            project_options)

    set_target_properties(linux_i2c PROPERTIES LINKER_LANGUAGE CXX)

    target_include_directories(linux_i2c PUBLIC include)

    target_include_directories(docs INTERFACE include)

    add_subdirectory(tests)
endif()