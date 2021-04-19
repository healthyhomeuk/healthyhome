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

import React, { useState, useEffect, createContext, useContext } from "react";
import { ApolloClient } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import Device from "./Device";
import * as helpers from "./helpers";

const Ctx = createContext({});

const disconnectedState = {
    hostname: undefined,
    name: "",
    devices: [],
    sensors: [],
    hasNotifications: undefined,
};

export const instance = new Device();

function DeviceProvider({ children }) {
    const [server, setServer] = useState(disconnectedState);
    const [servers, setServers] = useState([]);

    const [connecting, setConnecting] = useState(false);
    const [loading, setLoading] = useState(false);

    async function disconnect() {
        await instance.disconnect();
        setServer(disconnectedState);
    }

    async function connectToServer(hostname) {
        if (server.hostname) {
            await disconnect();
        }

        setConnecting(hostname);

        await instance.connect(hostname);
        const name = await instance.getName();
        const devices = await instance.getSensorsDevices();
        const sensors = await instance.getSensors();
        const hasNotifications = await instance.hasNotifications();

        setServer({
            hostname,
            name,
            devices,
            sensors,
            hasNotifications,
        });

        await helpers.saveServerAsLast(hostname);
        await helpers.saveServer({ hostname, name });

        setServers(await helpers.getSavedServers());
    }

    async function setServerName(name) {
        setServer({ ...server, name });
        await instance.setName(name);
        await helpers.saveServer({ hostname: server.hostname, name });
        setServers(await helpers.getSavedServers());
    }

    useEffect(() => {
        async function connectToLastServer() {
            const hostname = await helpers.lastServer();
            if (!hostname) return Promise.reject(false);
            return connectToServer(hostname);
        }

        helpers.getSavedServers().then(setServers).catch(console.error);

        connectToLastServer()
            .catch((err) => {
                if (err !== false) console.error(err);
            })
            .finally(() => setConnecting(false));
    }, []);

    async function deleteServer(hostname) {
        if (server.hostname === hostname) {
            await disconnect();
        }
        await helpers.deleteServer(hostname);
        setServers(await helpers.getSavedServers());
    }

    async function registerNotifications(token) {
        const hasNotifications = await instance.toggleNotifications(token);
        setServer({ ...server, hasNotifications });
        return hasNotifications;
    }

    const state = {
        server,
        connecting,
        servers,
        connectToServer,
        deleteServer,
        disconnect,
        setServerName,
        setConnecting,
        registerNotifications,
    };

    return (
        <Ctx.Provider value={state}>
            <ApolloProvider client={instance.client}>{children}</ApolloProvider>
        </Ctx.Provider>
    );
}

export function ConnectedProvider({ children }) {
    return children;
}

export default DeviceProvider;

export function useDevice() {
    return useContext(Ctx);
}
