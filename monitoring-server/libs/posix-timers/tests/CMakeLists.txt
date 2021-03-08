if (ENABLE_TESTING)
    add_executable(posix_timers_tests)

    set_target_properties(posix_timers_tests PROPERTIES LINKER_LANGUAGE CXX)

    target_link_libraries(posix_timers_tests
            PRIVATE
            Catch2::Catch2
            posix_timers)

    add_test(NAME PosixTimersTest COMMAND posix_timers_tests)
endif()