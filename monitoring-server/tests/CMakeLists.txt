if (ENABLE_TESTING)
    add_executable(Core_tests)

    set_target_properties(Core_tests PROPERTIES LINKER_LANGUAGE CXX)

    target_link_libraries(Core_tests
            PRIVATE
            Catch2::Catch2
            Core)

    add_test(NAME CoreTests COMMAND Core_tests)
endif()