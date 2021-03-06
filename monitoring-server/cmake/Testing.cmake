
option(ENABLE_TESTING "Enable testing" TRUE)

if (ENABLE_TESTING)
    enable_testing()
    find_package(Catch2 REQUIRED)
endif()