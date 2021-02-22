
add_library(Core)

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
