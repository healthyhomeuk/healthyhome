
add_library(Core)

target_link_libraries(Core
        PRIVATE
        project_warnings)

set_target_properties(Core PROPERTIES LINKER_LANGUAGE CXX)

target_include_directories(Core
        PUBLIC
        include
        PRIVATE
        src)
