cmake_minimum_required(VERSION 3.13)

project(MonitoringServer CXX C)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

set(CMAKE_SKIP_INSTALL_ALL_DEPENDENCY true)

## Add project options
add_library(project_options INTERFACE)

## Add compiler warnings
add_library(project_warnings INTERFACE)
include(cmake/CompilerWarnings.cmake)
set_project_warnings(project_warnings)

## Add sanitizers
include(cmake/Sanitizers.cmake)
enable_sanitizers(project_options)

## Add static analyzers
include(cmake/StaticAnalyzers.cmake)

## Add testing
include(cmake/Testing.cmake)

## Add project
add_library(docs INTERFACE)
include(cmake/Project.cmake)

## Add docs
add_subdirectory(docs)
