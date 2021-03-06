
add_library(SN-GCJA5)

target_sources(SN-GCJA5
        PUBLIC
        include/sn-gcja5/Device.h)

target_link_libraries(SN-GCJA5
        PRIVATE
        Core
        project_warnings
        project_options)

set_target_properties(SN-GCJA5 PROPERTIES LINKER_LANGUAGE CXX)

target_include_directories(SN-GCJA5 PUBLIC include)

target_include_directories(docs INTERFACE include)

add_subdirectory(tests)