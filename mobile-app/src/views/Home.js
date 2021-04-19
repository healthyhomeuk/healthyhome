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
import React, { useEffect, useState, useRef } from "react";
import {
    ActivityIndicator,
    Text,
    View,
    ScrollView,
    Pressable,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Style from "../assets/Style";
import Header from "../components/Header";
import Card from "../components/Card";
import { levels, units } from "../components/SensorData";
import { useSubscription } from "@apollo/client";
import { SENSOR_UPDATE } from "../api/fetchers";
import { useDevice } from "../DeviceProvider";
import CardDescription from "../components/CardDescription";

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
    const {
        server: { sensors, name: serverName, hostname },
        connecting: loading,
    } = useDevice();

    if (!hostname && !loading)
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f2ffea",
                    padding: 25,
                }}
            >
                <Text
                    style={{
                        fontSize: 42,
                        fontWeight: "bold",
                        marginBottom: 20,
                    }}
                >
                    Welcome! 👋🏼
                </Text>
                <Text style={{ fontSize: 18, textAlign: "center" }}>
                    Thank you for using HealthyHome! To start your journey,
                    please head over to the{" "}
                    <Text style={{ fontWeight: "bold" }}>Settings</Text> tab at
                    the bottom left corner of your screen. There, you will be
                    able to connect to your HealthyHome-powered device!{" "}
                    <Text style={{ fontSize: 24 }}>😄</Text>
                </Text>
            </View>
        );

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#f2ffea",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" color="#555" />
                <Text style={{ marginTop: 5, fontSize: 18, color: "#555" }}>
                    Loading data
                </Text>
            </View>
        );
    }

    return <CardsView sensors={sensors} serverName={serverName} />;
}

function CardsView({ sensors, serverName }) {
    const {
        data: updates,
        loading: subscriptionLoading,
        error: subscriptionError,
    } = useSubscription(SENSOR_UPDATE);
    const [updatedValues, setUpdatedValues] = useState({});
    const [selectedCard, setSelectedCard] = useState({});

    useEffect(() => {
        if (!subscriptionLoading && updates && updates.sensorUpdate) {
            const newValues = { ...updatedValues };

            updates.sensorUpdate.parameters.forEach((paramUpdate) => {
                newValues[`${updates.sensorUpdate.id}.${paramUpdate.id}`] = {
                    value: paramUpdate.value,
                    quality: paramUpdate.quality,
                };
            });

            setUpdatedValues(newValues);
        }
    }, [subscriptionLoading, updates]);

    // if (error) {
    //     return (
    //         <View style={Style.container}>
    //             <Text>{`Error! ${error.message}`}</Text>
    //         </View>
    //     );
    // }
    const cardDescriptionRef = useRef(null);
    const iaq = sensors.find((element) => element.sensorId === "iaq");
    return (
        <View style={{ flex: 1, backgroundColor: "#f2ffea" }}>
            <View
                style={{
                    padding: 10,
                    borderBottomColor: "#eee",
                    borderBottomWidth: 1,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <View>
                    <View
                        style={{
                            backgroundColor: "green",
                            borderRadius: "50%",
                            width: 15,
                            height: 15,
                            marginRight: 15,
                        }}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: 14 }}>Connected to</Text>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        {serverName}
                    </Text>
                </View>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={Style.container}>
                    <Pressable
                        onPress={() => {
                            setSelectedCard(iaq);
                            cardDescriptionRef.current.present();
                        }}
                        key={iaq.name}
                    >
                        <Card
                            {...iaq}
                            updatedValue={
                                updatedValues[`${iaq.sensorId}.${iaq.paramId}`]
                            }
                            isRectangle
                        />
                    </Pressable>
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
                                <Pressable
                                    onPress={() => {
                                        setSelectedCard(value);
                                        cardDescriptionRef.current.present();
                                    }}
                                    key={value.name}
                                >
                                    <Card
                                        key={value.name}
                                        {...value}
                                        updatedValue={
                                            updatedValues[
                                                `${value.sensorId}.${value.paramId}`
                                            ]
                                        }
                                    />
                                </Pressable>
                            ))}
                    </View>
                </View>
                <StatusBar style="auto" />
                <CardDescription
                    ref={cardDescriptionRef}
                    {...selectedCard}
                    values={updatedValues}
                />
            </ScrollView>
        </View>
    );
}

export default HomeStackScreen;
