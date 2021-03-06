if (ENABLE_TESTING)
    add_executable(SN-GCJA5_tests)

    set_target_properties(SN-GCJA5_tests PROPERTIES LINKER_LANGUAGE CXX)

    target_link_libraries(SN-GCJA5_tests
            PRIVATE
            Catch2::Catch2
            SN-GCJA5)

    add_test(NAME SN-GCJA5Tests COMMAND SN-GCJA5_tests)
endif()