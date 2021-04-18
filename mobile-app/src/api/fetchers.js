/*
 * This file is part of the HealthyHome project mobile app
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

import {
    ApolloClient,
    InMemoryCache,
    gql,
    split,
    HttpLink,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
    uri: "http://DESKTOP-BAJSVOE.local:4000/graphql",
});

const wsLink = new WebSocketLink({
    uri: "ws://DESKTOP-BAJSVOE.local:4000/subscriptions",
    options: {
        reconnect: true,
    },
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    httpLink
);

export const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});

/**
 * The query to obtain all the sensors registered to the device and its last readings
 *  @constant {DocumentNode}
 */
export const LAST_READINGS = gql`
    query GetLastReadings {
        sensors {
            id
            name
            parameters {
                id
                name
                unit
                qualityTable {
                    qualityValue
                    lowerBoundary
                    upperBoundary
                }
                valueType
                currentValue
                currentQuality
            }
        }
    }
`;

export const SENSOR_UPDATE = gql`
    subscription GetSensorUpdate {
        sensorUpdate {
            id
            parameters {
                id
                value
                quality
            }
        }
    }
`;

export const HAS_NOTIFICATIONS = gql`
    query HasNotifications($deviceId: string) {
        hasNotifications(recipientId: $deviceId)
    }
`;

export const DEVICES_NAME = gql`
    query GetDeviceNames {
        devices
    }
`;
