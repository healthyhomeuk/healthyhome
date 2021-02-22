
add_library(Core)

set_target_properties(Core PROPERTIES LINKER_LANGUAGE CXX)

target_include_directories(Core
        PUBLIC
        include
        PRIVATE
        src)
