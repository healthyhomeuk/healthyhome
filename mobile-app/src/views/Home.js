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
import React, { useEffect } from "react";
import { Text, View, ScrollView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Style from "../assets/Style";
import Header from "../components/Header";
import Card from "../components/Card";
import { levels, units } from "../components/SensorData";
import { useSensors } from "../SensorsProvider";
import { useSubscription } from "@apollo/client";
import { SENSOR_UPDATE } from "../api/fetchers";

/**
 * Stack component to wrap around the screen and render Header
 * @constant { Stack }
 */
const HomeStack = createStackNavigator();

/**
 * Renders the Home component wrapped with the Stack component
 */
function HomeStackScreen() {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerTitle: () => <Header />,
                headerStyle: Style.headerStyle,
            }}
        >
            <HomeStack.Screen name="Home" component={Home} />
        </HomeStack.Navigator>
    );
}

/**
 * Renders the home screen.
 */
function Home() {
    const { sensors, updateSensor, loading, error } = useSensors();
    const {
        data: updates,
        loading: subscriptionLoading,
        error: subscriptionError,
    } = useSubscription(SENSOR_UPDATE);

    useEffect(() => {
        if (!subscriptionLoading && updates && updates.sensorUpdate) {
            updateSensor(updates.sensorUpdate);
        }
    }, [subscriptionLoading, updates]);

    if (loading && !sensors) {
        return (
            <View style={Style.container}>
                <Text>Loading...</Text>
            </View>
        );
    }
    if (error) {
        return (
            <View style={Style.container}>
                <Text>{`Error! ${error.message}`}</Text>
            </View>
        );
    }
    const iaq = sensors.find((element) => element.sensorId === "iaq");
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#f2ffea" }}>
            <View style={Style.container}>
                <Card {...iaq} isRectangle />
            </View>
            <View style={Style.container}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <Text style={Style.title}>Other Data</Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    {sensors
                        .filter((value) => value.sensorId !== "iaq")
                        .map((value) => (
                            <Card key={value.name} {...value} />
                        ))}
                </View>
            </View>
            <StatusBar style="auto" />
        </ScrollView>
    );
}

export default HomeStackScreen;
