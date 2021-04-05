if (ENABLE_TESTING)
    add_executable(Core_tests)

    target_sources(Core_tests
            PRIVATE
            test_main.cpp
            test_MessageEntity.cpp)

    set_target_properties(Core_tests PROPERTIES LINKER_LANGUAGE CXX)

    target_link_libraries(Core_tests
            PRIVATE
            Catch2::Catch2
            Core)

    add_test(NAME CoreTests COMMAND Core_tests)
endif()