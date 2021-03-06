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
 * @file core/Event.h
 */

#ifndef CORE_EVENT_H
#define CORE_EVENT_H

#include <core/defs.h>

namespace Core {

    /**
     * @brief Interface required to be implemented for any event that
     *        requires scheduling.
     * @headerfile core/Event.h <core/Event.h>
     */
    class Event {
    public:
        /**
         * @brief Callback to process the event.
         * @return Operation status code.
         */
        virtual StatusCode process() = 0;

        /**
         * @brief Default deconstructor
         */
        virtual ~Event() = default;
    };

}

#endif // CORE_EVENT_H
