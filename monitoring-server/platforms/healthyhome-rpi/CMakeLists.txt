add_executable(healthyhome-rpi)

target_sources(healthyhome-rpi
        PUBLIC
        src/main.cpp)

target_link_libraries(healthyhome-rpi
        PRIVATE
        Core
        BME680
        SI1145
        SN-GCJA5
        project_warnings
        project_options)

target_include_directories(healthyhome-rpi PUBLIC include)

target_include_directories(docs INTERFACE include)