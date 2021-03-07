if (ENABLE_TESTING)
    add_executable(linux_i2c_tests)

    set_target_properties(linux_i2c_tests PROPERTIES LINKER_LANGUAGE CXX)

    target_link_libraries(linux_i2c_tests
            PRIVATE
            Catch2::Catch2
            linux_i2c)

    add_test(NAME LinuxI2CTests COMMAND linux_i2c_tests)
endif()