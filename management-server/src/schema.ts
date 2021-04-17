/*
 * This file is part of the HealthyHome project management server
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

import { gql } from "apollo-server";
import { NumberType, Quality } from "./sensors/types";

/**
 * Change server name mutation request body
 */
 export interface ChangeServerNameMutation {
    /** Server new name */
    newName: string;
}

/**
 * Toggle notifications mutation request body
 */
export interface ToggleNotificationsMutation {
    /** Recipient unique identifier */
    recipientId: string;
    /** Recipient's push token */
    pushToken?: string;
}

/**
 * Has notifications query request body
 */
export interface HasNotificationsQuery {
    /** Recipient unique identifier */
    recipientId: string;
}

/**
 * Get sensors query request body
 */
export interface GetSensorsQuery {
    /** Sensor unique identifier */
    id?: string;
}

/**
 * Quality boundary GraphQL type
 */
export interface QualityBoundary {
    /** Quality level value */
    qualityValue: Quality;
    /** Level lower boundary (inclusive) */
    lowerBoundary?: number;
    /** Level upper boundary (exclusive) */
    upperBoundary?: number;
}

/**
 * Sensor parameter GraphQL type
 */
export interface SensorParameter {
    /** Parameter identifier */
    id: string;
    /** Parameter textual name */
    name: string;
    /** Parameter quality levels table */
    qualityTable: QualityBoundary[];
    /** Parameter value type */
    valueType: NumberType;

    /** Parameter current value */
    currentValue?: number;
    /** Parameter current quality level */
    currentQuality: Quality;
}

/**
 * Sensor GraphQL type
 */
export interface Sensor {
    /** Sensor identifier */
    id: string;
    /** Sensor textual name */
    name: string;
    /** Sensor parameters list */
    parameters: SensorParameter[];
}

/**
 * Sensor parameter update GraphQL type
 */
export interface SensorParameterUpdate {
    /** Parameter identifier */
    id: string;
    /** Parameter value */
    value: number;
    /** Parameter quality level */
    quality: Quality;
}

/**
 * Sensor update GraphQL type
 */
export interface SensorUpdate {
    /** Sensor identifier */
    id: string;
    /** Sensor parameters updates list */
    parameters: SensorParameterUpdate[];
}

/**
 * GraphQL schema
 */
export default gql`
    """
    Quality levels enumeration
    """
    enum Quality {
        "Unknown quality level"
        UNKNOWN
        "Severe quality level"
        SEVERE
        "Very bad quality level"
        VERY_BAD
        "Bad quality level"
        BAD
        "Poor quality level"
        POOR
        "Fair quality level"
        FAIR
        "Good quality level"
        GOOD
        "Excellent quality level"
        EXCELLENT
    }

    """
    Number types enumeration
    """
    enum NumberType {
        INTEGER
        FLOAT
    }

    """
    Quality boundary type
    """
    type QualityBoundary {
        "Quality value"
        qualityValue: Quality!
        "Level lower boundary (inclusive)"
        lowerBoundary: Float
        "Level upper boundary (exclusive)"
        upperBoundary: Float
    }

    """
    Sensor parameter type
    """
    type SensorParameter {
        "Parameter identifier"
        id: String!
        "Parameter textual name"
        name: String!
        "Parameter measurement unit"
        unit: String!
        "Parameter quality levels table"
        qualityTable: [QualityBoundary]!
        "Parameter value number type"
        valueType: NumberType!

        "Parameter current value"
        currentValue: Float
        "Paramter current quality level"
        currentQuality: Quality!
    }

    """
    Sensor type
    """
    type Sensor {
        "Sensor identifier"
        id: String!
        "Sensor textual name"
        name: String!
        "Sensor parameters list"
        parameters: [SensorParameter]!
    }

    """
    Sensor parameter update type
    """
    type SensorParameterUpdate {
        "Parameter identifier"
        id: String!
        "Parameter value"
        value: Float!
        "Parameter quality level"
        quality: Quality!
    }

    """
    Sensor update type
    """
    type SensorUpdate {
        "Sensor identifier"
        id: String!
        "Sensor paramaters update list"
        parameters: [SensorParameterUpdate]!
    }

    type Query {
        "The name of the server"
        serverName: String
        "Queries all the available devices"
        devices: [String]
        "Queries all the available sensors or the specified one."
        sensors(id: String): [Sensor]
        "Queries if the recipient is registered for push notifications"
        hasNotifications(recipientId: String!): Boolean
    }

    type Mutation {
        "Register/unregister recipient to push notifications"
        toggleNotifications(recipientId: String!, pushToken: String): Boolean
        "Change the name of the server"
        changeServerName(newName: String!): Boolean
    }

    type Subscription {
        "Sensor value update"
        sensorUpdate: SensorUpdate
    }
`;
