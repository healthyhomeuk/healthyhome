find_package(cppzmq)

add_library(zmq_postman)

target_sources(zmq_postman
        PUBLIC
        include/zmq-postman/defs.h
        include/zmq-postman/BadRequestMessage.h
        include/zmq-postman/Message.h
        include/zmq-postman/MessageBody.h
        include/zmq-postman/NotFoundMessage.h
        include/zmq-postman/Postman.h

        src/Message.cpp
        src/MessageBody.cpp
        src/Postman.cpp)

target_link_libraries(zmq_postman
        PRIVATE
        Core
        project_warnings
        project_options
        PUBLIC
        cppzmq)

set_target_properties(zmq_postman PROPERTIES LINKER_LANGUAGE CXX)

target_include_directories(zmq_postman PUBLIC include)

target_include_directories(docs INTERFACE include)