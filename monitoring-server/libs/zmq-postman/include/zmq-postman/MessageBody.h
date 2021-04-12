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

#ifndef ZMQ_POSTMAN_MESSAGE_BODY_H
#define ZMQ_POSTMAN_MESSAGE_BODY_H

#include <unordered_map>

namespace ZmqPostman {

/**
 * @brief ZeroMQ message body class representation
 */
class MessageBody : public std::unordered_map<std::string, std::string> {
public:
    /**
     * Put a new key-value pair in the body,
     * converting the value into string and tagging
     * its type.
     *
     * @param key
     * @param value
     */
    void putTagged(std::string key, int value);
    /// @copydoc putTagged(std::string key, int value)
    void putTagged(std::string key, float value);
    /// @copydoc putTagged(std::string key, int value)
    void putTagged(std::string key, double value);
    /// @copydoc putTagged(std::string key, int value)
    void putTagged(std::string key, bool value);
    /**
     * Put a new key-value pair in the body.
     *
     * @param key
     * @param value
     */
    void put(std::string key, std::string value);

    /**
     * Fetch a value given a key.
     *
     * @param key
     * @return value if found
     * @throws Core::Exception::InvalidArgument if no such member was found.
     */
    std::string get(const std::string& key) const;

    /**
     * Fetch a value given a key and convert its type to integer.
     * @param key
     * @return converted value if found
     * @throws Core::Exception::InvalidArgument if no such member was found.
     * @throws Core::Exception::InvalidArgument if the value could not be
     * converted.
     */
    int getInteger(const std::string& key) const;

    /**
     * Fetch a value given a key and convert its type to float.
     * @param key
     * @return converted value if found
     * @throws Core::Exception::InvalidArgument if no such member was found.
     * @throws Core::Exception::InvalidArgument if the value could not be
     * converted.
     */
    float getFloat(const std::string& key) const;

    /**
     * Fetch a value given a key and convert its type to double.
     * @param key
     * @return converted value if found
     * @throws Core::Exception::InvalidArgument if no such member was found.
     * @throws Core::Exception::InvalidArgument if the value could not be
     * converted.
     */
    double getDouble(const std::string& key) const;

    /**
     * Fetch a value given a key and convert its type to boolean.
     * @param key
     * @return converted value if found
     * @throws Core::Exception::InvalidArgument if no such member was found.
     * @throws Core::Exception::InvalidArgument if the value could not be
     * converted.
     */
    bool getBoolean(const std::string& key) const;

    /**
     * Assert if the number of members is the same as the value given.
     * @param length Number to assert.
     * @param msg Message to throw if assertion fails.
     * @throws Core::Exception::InvalidArgument with message msg if assertion
     * fails.
     */
    void assertSizeIs(size_t length, const std::string& msg) const;

    /**
     * @brief Casts a ZeroMQ payload.
     */
    static const MessageBody* castPayload(const void* payload);
    /// @copydoc MessageBody::castPayload(const void *payload)
    static MessageBody* castPayload(void* payload);
};

}

#endif // ZMQ_POSTMAN_MESSAGE_BODY_H
