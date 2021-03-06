if (ENABLE_TESTING)
    add_executable(BME680_tests)

    set_target_properties(BME680_tests PROPERTIES LINKER_LANGUAGE CXX)

    target_link_libraries(BME680_tests
            PRIVATE
            Catch2::Catch2
            BME680)

    add_test(NAME BME680Tests COMMAND BME680_tests)
endif()