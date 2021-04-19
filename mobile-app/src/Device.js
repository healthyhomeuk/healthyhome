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
import { getDeviceId } from "./helpers";

export default class Device {
    link;
    client;

    constructor(hostname) {
        this.connect(hostname);
    }

    async connect(hostname = "localhost") {
        this.link = split(
            ({ query }) => {
                const definition = getMainDefinition(query);
                return (
                    definition.kind === "OperationDefinition" &&
                    definition.operation === "subscription"
                );
            },
            new WebSocketLink({
                uri: `ws://${hostname}:4000/subscriptions`,
                options: {
                    reconnect: true,
                },
            }),
            new HttpLink({
                uri: `http://${hostname}:4000/graphql`,
            })
        );

        this.client = new ApolloClient({
            link: this.link,
            cache: new InMemoryCache(),
        });
    }

    async disconnect() {
        await this.client.stop();
    }

    async getSensors() {
        const {
            data: { sensors },
        } = await this.client.query({
            query: GET_SENSORS,
            fetchPolicy: "no-cache",
        });

        return sensors.reduce(
            (params, sensor) =>
                params.concat(
                    sensor.parameters.map((param) => ({
                        sensorId: sensor.id,
                        paramId: param.id,
                        value: param.currentValue,
                        valueType: param.valueType,
                        quality: param.currentQuality,
                        qualityTable: param.qualityTable,
                        name: param.name
                            ? `${sensor.name} ${param.name}`
                            : sensor.name,
                        unit: param.unit,
                    }))
                ),
            []
        );
    }

    async getSensorsDevices() {
        const {
            data: { devices },
        } = await this.client.query({
            query: GET_DEVICES,
            fetchPolicy: "no-cache",
        });

        return devices;
    }

    async getName() {
        const {
            data: { serverName },
        } = await this.client.query({
            query: GET_SERVER_NAME,
            fetchPolicy: "no-cache",
        });
        return serverName;
    }

    async setName(name) {
        const { changeServerName } = await this.client.mutate({
            mutation: SET_SERVER_NAME,
            variables: { name },
        });
        return changeServerName;
    }

    async hasNotifications() {
        const deviceId = await getDeviceId();
        const {
            data: { hasNotifications },
        } = await this.client.query({
            query: HAS_NOTIFICATIONS,
            variables: { deviceId },
            fetchPolicy: "no-cache",
        });
        return hasNotifications;
    }

    async toggleNotifications(pushToken) {
        const deviceId = await getDeviceId();
        const {
            data: { toggleNotifications },
        } = await this.client.mutate({
            mutation: TOGGLE_NOTIFICATIONS,
            variables: { deviceId, pushToken },
        });
        return toggleNotifications;
    }
}

const GET_SENSORS = gql`
    query GetSensors {
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

const SENSOR_UPDATE = gql`
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

const HAS_NOTIFICATIONS = gql`
    query HasNotifications($deviceId: String!) {
        hasNotifications(recipientId: $deviceId)
    }
`;

const TOGGLE_NOTIFICATIONS = gql`
    mutation ToggleNotifications($deviceId: String!, $pushToken: String) {
        toggleNotifications(recipientId: $deviceId, pushToken: $pushToken)
    }
`;

const GET_SERVER_NAME = gql`
    query GetServerName {
        serverName
    }
`;

const SET_SERVER_NAME = gql`
    mutation SetServerName($name: String!) {
        changeServerName(newName: $name)
    }
`;

const GET_DEVICES = gql`
    query GetDeviceNames {
        devices
    }
`;
