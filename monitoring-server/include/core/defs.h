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
 * @file core/defs.h
 */

#ifndef CORE_DEFS_H
#define CORE_DEFS_H

namespace Core {

    /**
     * @brief Operations status codes type
     * @headerfile core/defs.h <core/defs.h>
     *
     * This enumerator helps keeping consistency in
     * operation statuses throughout the whole project.
     * Any method that performs an operation a returns
     * a status code, should use this enumerator type.
     *
     * Usage example:
     * \code{.cpp}
     * Core::StatusCode computation(int a, b) {
     *     // perform super long computation
     *     return Core::SUCCESS;
     * }
     * \endcode
     */
    enum StatusCode {
        /**
         * returned if the operation was successful.
         */
        SUCCESS,
        /**
         * returned if the operation was not performed
         * due to the given resource being busy.
         */
        E_BUSY,
        /**
         * returned if the operation was not performed
         * due to a conflict with the given resource.
         */
        E_CONFLICT,
        /**
         * returned if the provided parameters are
         * out of bounds.
         */
        E_OUT_OF_BOUNDS,
        /**
         * returned if the given parameters are invalid
         */
        E_PARAMS,
        /**
         * returned for any other error.
         */
        E_GENERIC,
    };

    /**
     * @brief Scheduling priority levels
     * @headerfile core/defs.h <core/defs.h>
     */
    enum PriorityLevel {
        LOWEST,  ///< Lowest priority level
        LOW,     ///< Low priority level
        MEDIUM,  ///< Medium priority level
        HIGH,    ///< High priority level
        HIGHEST, ///< Highest priority level
    };
}

#endif // CORE_DEFS_H
