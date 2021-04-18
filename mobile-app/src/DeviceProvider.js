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
import { ApolloProvider } from "@apollo/client/react";
import Device from "./Device";
import * as helpers from "./helpers";

const Ctx = createContext({});

function DeviceProvider({ children }) {
    const [server, setServer] = useState({
        hostname: undefined,
        name: "",
        devices: [],
        sensors: [],
        object: undefined,
    });
    const [servers, setServers] = useState([]);

    const [connecting, setConnecting] = useState(false);
    const [loading, setLoading] = useState(false);

    async function connectToServer(hostname) {
        setConnecting(hostname);

        const object = new Device(hostname);
        const name = await object.getName();
        const devices = await object.getSensorsDevices();
        const sensors = await object.getSensors();

        setServer({
            hostname,
            object,
            name,
            devices,
            sensors,
        });

        await helpers.saveServerAsLast(hostname);
        await helpers.saveServer({ hostname, name });
        setServers(await helpers.getSavedServers());
    }

    async function setServerName(name) {
        setServer({ ...server, name });
        server.object.setName(name);
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

    const state = {
        server,
        connecting,
        servers,
        connectToServer,
        deleteServer: helpers.deleteServer,
        setServerName,
    };

    return (
        <Ctx.Provider value={state}>
            {server.object ? (
                <ApolloProvider client={server.object.client}>
                    {children}
                </ApolloProvider>
            ) : (
                children
            )}
        </Ctx.Provider>
    );
}

export default DeviceProvider;

export function useDevice() {
    return useContext(Ctx);
}
