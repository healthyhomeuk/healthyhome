/*
 * This file is part of the HealthyHome project monitoring server
 * available at <https://www.github.com/healthyhomeuk/healthyhome>.
 *
 * Copyright (C) 2021 the authors of the HealthyHome project.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3 of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * @file core/exceptions.h
 */

#ifndef CORE_EXCEPTIONS_H
#define CORE_EXCEPTIONS_H

#include <stdexcept>

namespace Core::Exception {

struct Busy : public std::exception {
    using std::exception::exception;
};

struct Conflict : public std::invalid_argument {
    using std::invalid_argument::invalid_argument;
};

struct InvalidArgument : public std::invalid_argument {
    using std::invalid_argument::invalid_argument;
};

struct NotFound : public std::invalid_argument {
    using std::invalid_argument::invalid_argument;
};

}

#endif