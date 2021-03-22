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

import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Style from "../assets/Style";
import Header from "../components/Header";

/**
 * @constant { Stack }
 */
const SettingsStack = createStackNavigator();

/**
 * Renders the Settings component wrapped with the Stack component
 */
function SettingsStackScreen() {
    return (
        <SettingsStack.Navigator
            screenOptions={{
                headerTitle: () => <Header />,
                headerStyle: Style.headerStyle,
            }}
        >
            <SettingsStack.Screen name="Settings" component={Settings} />
        </SettingsStack.Navigator>
    );
}

/**
 * Renders the Settings screen.
 */
function Settings() {
    return (
        <View style={Style.container}>
            <Text style={Style.text}>This is the Settings screen.</Text>
            <StatusBar style="auto" />
        </View>
    );
}

export default SettingsStackScreen;
