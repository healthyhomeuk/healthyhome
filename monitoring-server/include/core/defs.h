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

#include <assert.h>

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
     * returned if the requested resource was not found
     */
    E_NOT_FOUND,
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

/**
 * @brief Defines a server entity
 */
#define SERVER_ENTITY \
    {                 \
        SERVER, ""    \
    }

/**
 * @brief Defines a device entity with specified name
 */
#define DEVICE_ENTITY(name) \
    {                       \
        DEVICE, name        \
    }

/**
 * @brief Defines a sensor entity with specified name
 */
#define SENSOR_ENTITY(name) \
    {                       \
        SENSOR, name        \
    }

/**
 * @brief Creates a Message identity given entity and subject
 */
#define MAKE_IDENTITY(entity, subject) \
    std::make_tuple(entity.first, entity.second, subject)

/**
 * @brief Shortcut to set a static Entity property
 */
#define SET_ENTITY inline static const Entity ENTITY
/**
 * @brief Shortcut to set a static subject property
 */
#define SET_SUBJECT inline static const char* SUBJECT
/**
 * @brief Shortcut to set a static Identity property
 */
#define SET_IDENTITY inline static const Identity IDENTITY

/**
 * @brief Defines a static serializer and its implementation
 *
 * A static serializer is a serializer that is due to be implemented
 * outside the library at the executable level to satisfy the choice of
 * Postman.
 */
#define STATIC_SERIALIZER(className)                                      \
    inline static std::function<void(const className&, void*)> SERIALIZER \
        = nullptr;                                                        \
                                                                          \
    void serialize(void* payload) const override                          \
    {                                                                     \
        assert(SERIALIZER != nullptr);                                    \
        SERIALIZER(*this, payload);                                       \
    }

/**
 * @brief Defines a static deserializer and its implementation
 *
 * A static deserializer is a deserializer that is due to be implemented
 * outside the library at the executable level to satisfy the choice of
 * Postman.
 */
#define STATIC_DESERIALIZER(className)                                      \
    inline static std::function<void(className&, const void*)> DESERIALIZER \
        = nullptr;                                                          \
                                                                            \
    void deserialize(const void* payload) override                          \
    {                                                                       \
        assert(DESERIALIZER != nullptr);                                    \
        DESERIALIZER(*this, payload);                                       \
    }

/**
 * @brief Creates common getters and setters to every Message
 */
#define MAKE_MESSAGE(className)                     \
    SET_IDENTITY = MAKE_IDENTITY(ENTITY, SUBJECT);  \
                                                    \
    className() = default;                          \
                                                    \
    static std::unique_ptr<Core::Message> factory() \
    {                                               \
        return std::make_unique<className>();       \
    }                                               \
                                                    \
    Entity getEntity() const override               \
    {                                               \
        return ENTITY;                              \
    }                                               \
                                                    \
    std::string getSubject() const override         \
    {                                               \
        return SUBJECT;                             \
    }                                               \
                                                    \
    Identity getIdentity() const override           \
    {                                               \
        return IDENTITY;                            \
    }

}

#endif // CORE_DEFS_H
