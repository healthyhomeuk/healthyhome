if (ENABLE_TESTING)
    add_executable(zmq_postman_tests)

    target_sources(zmq_postman_tests
            PUBLIC
            test_main.cpp
            test_Message.cpp)

    set_target_properties(zmq_postman_tests PROPERTIES LINKER_LANGUAGE CXX)

    target_link_libraries(zmq_postman_tests
            PRIVATE
            Catch2::Catch2
            Core
            zmq_postman)

    add_test(NAME ZmqPostmanTest COMMAND zmq_postman_tests)
endif()