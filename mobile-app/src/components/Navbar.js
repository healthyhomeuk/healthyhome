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
import DataStackScreen from "../views/Data";
import HomeStackScreen from "../views/Home";
import SettingsStackScreen from "../views/Settings";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

/**
 * Bottom Tab Navigator
 * @constant { Tab }
 */
const Tab = createBottomTabNavigator();
/**
 * This component renders the navigation bar.
 * @returns {Tab.Navigator}
 */
function NavBar() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: "black",
                inactiveTintColor: "gray",
                style: { backgroundColor: "#f2ffea" },
            }}
            screenOptions={({ route }) => ({ tabBarIcon: tabBarIcon(route) })}
        >
            <Tab.Screen name="Settings" component={SettingsStackScreen} />
            <Tab.Screen name="Home" component={HomeStackScreen} />
            {/* <Tab.Screen name="Data" component={DataStackScreen} /> */}
        </Tab.Navigator>
    );
}

/**
 * Renders the icons for the navbar.
 * @param {RouteProp<Record<string, object>, string>} route
 * @returns {Ionicons}
 */
const tabBarIcon = (route) => ({ focused, color }) => {
    let iconName;

    if (route.name === "Home") {
        iconName = focused ? "home" : "home-outline";
    } else if (route.name === "Settings") {
        iconName = focused ? "settings" : "settings-outline";
    } else {
        iconName = focused ? "analytics" : "analytics-outline";
    }
    return <Ionicons name={iconName} size={28} color={color} />;
};

export default NavBar;
