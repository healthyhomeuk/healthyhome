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

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import NavBar from "./components/Navbar";
import { client } from "./api/fetchers";
import { ApolloProvider } from "@apollo/client/react";
import { SensorsProvider } from "./SensorsProvider";
import * as Notifications from "expo-notifications";
import DeviceProvider from "./DeviceProvider";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

/**
 * Renders all the components of the app.
 */
export default function App() {
    return (
        <BottomSheetModalProvider>
            <DeviceProvider>
                <NavigationContainer>
                    <NavBar />
                </NavigationContainer>
            </DeviceProvider>
        </BottomSheetModalProvider>
    );
}

/*

            <ApolloProvider client={client}>
                <SensorsProvider>
                    <NavigationContainer>
                        <NavBar />
                    </NavigationContainer>
                </SensorsProvider>
            </ApolloProvider>
            */
