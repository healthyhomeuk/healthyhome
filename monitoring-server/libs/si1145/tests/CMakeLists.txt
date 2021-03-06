if (ENABLE_TESTING)
    add_executable(SI1145_tests)

    set_target_properties(SI1145_tests PROPERTIES LINKER_LANGUAGE CXX)

    target_link_libraries(SI1145_tests
            PRIVATE
            Catch2::Catch2
            SI1145)

    add_test(NAME SI1145Tests COMMAND SI1145_tests)
endif()