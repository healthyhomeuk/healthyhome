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

import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Style from "../assets/Style";
import Header from "../components/Header";

/**
 * Stack component to wrap around the screen and render Header
 * @constant { Stack }
 */
const DataStack = createStackNavigator();

/**
 * Renders the Data component wrapped with the Stack component
 */
function DataStackScreen() {
    return (
        <DataStack.Navigator
            screenOptions={{
                headerTitle: () => <Header />,
                headerStyle: Style.headerStyle,
            }}
        >
            <DataStack.Screen name="Data" component={Data} />
        </DataStack.Navigator>
    );
}

/**
 * Renders the data screen, where data is displayed historically.
 */
function Data() {
    return (
        <View style={Style.container}>
            <Text style={Style.text}>This is the Data screen.</Text>
            <StatusBar style="auto" />
        </View>
    );
}

export default DataStackScreen;
