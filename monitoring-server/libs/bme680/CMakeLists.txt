
add_library(BME680)

target_sources(BME680
        PUBLIC
        include/bme680/Device.h)

target_link_libraries(BME680
        PRIVATE
        Core
        project_warnings
        project_options)

set_target_properties(BME680 PROPERTIES LINKER_LANGUAGE CXX)

target_include_directories(BME680 PUBLIC include)

target_include_directories(docs INTERFACE include)

add_subdirectory(tests)