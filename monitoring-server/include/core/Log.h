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
 * @file core/Log.h
 */

#ifndef CORE_LOG_H
#define CORE_LOG_H

#include <iostream>
#include <string>

namespace Core {

    /**
     * @brief Data logging facility
     */
    class Log {
    public:
        /**
         * @brief Logging levels
         */
        enum Level {
            DEBUG,
            INFO,
            WARNING,
            ERROR,
        };

        /**
         * @brief Sets the global Log instance up.
         * @param level sets the minimum logging level
         * @param out output stream for the logs.
         * @param err output stream for the errors.
         */
        static StatusCode setup(Level level, std::ostream &out, std::ostream &err);

        /**
         * @brief Output warnings to error stream (DEFAULT: true)
         * @param condition yes/true or no/false
         */
        static void logWarningsToErrStream(bool condition);

        /**
         * @name Logging methods
         * @{
         */

        /**
         * @brief Log debugging information
         * @param message message to log
         */
        static void debug(std::string message);

        /**
         * @brief Log generic information
         * @param message message to log
         */
        static void info(std::string message);

        /**
         * @brief Log warnings
         * @param message message to log
         */
        static void warn(std::string message);

        /**
         * @brief Log errors
         * @param message message to log
         */
        static void error(std::string message);

        /**
         * @}
         */
    private:
        static Log instance = Log(cout, cerr);
        std::ostream &out, err;
        Level level;
        bool warningsToErrStream = true;
    };

}

#endif // CORE_LOG_H
