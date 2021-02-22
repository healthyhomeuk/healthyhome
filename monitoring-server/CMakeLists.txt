cmake_minimum_required(VERSION 3.13)

project(MonitoringServer CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

## Add project options
add_library(project_options INTERFACE)

## Add compiler warnings
add_library(project_warnings INTERFACE)
include(cmake/CompilerWarnings.cmake)
set_project_warnings(project_warnings)

## Add static analyzers
include(cmake/StaticAnalyzers.cmake)

## Add project
include(cmake/Project.cmake)
