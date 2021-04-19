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
import React, { useEffect, useState, useRef, useCallback } from "react";
import {
    ActivityIndicator,
    Pressable,
    Text,
    View,
    ScrollView,
    Switch,
    Platform,
    FlatList,
    StyleSheet,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Style from "../assets/Style";
import Header from "../components/Header";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Application from "expo-application";
import Devices from "../components/DevicesList";
import ServerSettings from "../components/ServerSettings";
import { useDevice } from "../DeviceProvider";
import { SwipeListView } from "react-native-swipe-list-view";
import AddNewServer from "../components/AddNewServer";

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
function Settings({ navigation }) {
    const {
        servers,
        server: { hostname },
        connectToServer,
        connecting,
        setConnecting,
        deleteServer: delServer,
    } = useDevice();

    const deviceSettingsRef = useRef(null);
    const newServerRef = useRef(null);

    const onServerPress = (selectedHostname) => {
        if (selectedHostname === hostname) {
            deviceSettingsRef.current?.present();
        } else if (connecting === false) {
            connectToServer(selectedHostname)
                .then(() => {
                    navigation.navigate("Home");
                })
                .catch((err) => {
                    alert("Could not connect to the server!");
                })
                .finally(() => setConnecting(false));
        }
    };

    const connectNew = (newHostname) => {
        if (newHostname.trim().length > 0) {
            connectToServer(newHostname)
                .then(() => {
                    newServerRef.current?.dismiss();
                    deviceSettingsRef.current?.present();
                })
                .catch((err) => {
                    alert("Could not connect to server!");
                })
                .finally(() => setConnecting(false));
        } else {
            alert("Invalid hostname provided!");
        }
    };

    const deleteServer = (delHostname) => {
        delServer(delHostname).catch((err) => {
            alert("An error occured while deleting this server!");
        });
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#f2ffea" }}>
            {servers.length > 0 ? (
                <SwipeListView
                    style={{ flexGrow: 1, height: "100%" }}
                    disableRightSwipe
                    data={servers}
                    keyExtractor={(item) => item.hostname}
                    renderItem={({ item }) => (
                        <ServerEntry
                            server={item}
                            currentServer={hostname}
                            onServerPress={onServerPress}
                            connecting={connecting}
                        />
                    )}
                    renderHiddenItem={(data, rowMap) => (
                        <View style={styles.rowBack}>
                            <Pressable
                                style={[
                                    styles.backRightBtn,
                                    styles.backRightBtnRight,
                                ]}
                                onPress={() => deleteServer(hostname)}
                            >
                                <Text style={styles.backTextWhite}>Delete</Text>
                            </Pressable>
                        </View>
                    )}
                    rightOpenValue={-75}
                />
            ) : (
                <View style={{ flex: 1 }}>
                    <Text style={styles.noDevicesMessage}>
                        Looks like you still don't have any devices! Add one now
                        with the button below!
                    </Text>
                </View>
            )}
            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={() => newServerRef.current.present()}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Register new server</Text>
                </Pressable>
            </View>
            <AddNewServer ref={newServerRef} connect={connectNew} />
            <ServerSettings ref={deviceSettingsRef} />
            <StatusBar style="auto" />
        </View>
    );
}

const ServerEntry = ({ server, currentServer, onServerPress, connecting }) => {
    return (
        <Pressable
            style={styles.item}
            onPress={() => onServerPress(server.hostname)}
        >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.header}>{server.name}</Text>
                    <Text style={styles.subheader}>{server.hostname}</Text>
                </View>
                {server.hostname === currentServer ? (
                    <View
                        style={{
                            backgroundColor: "green",
                            borderRadius: "50%",
                            width: 20,
                            height: 20,
                            marginLeft: 15,
                        }}
                    />
                ) : (
                    server.hostname === connecting && <ActivityIndicator />
                )}
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    item: ({ pressed }) => ({
        backgroundColor: pressed ? "#f4f4f4" : "white",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        padding: 15,
        width: "100%",
    }),
    header: {
        fontSize: 18,
        color: "#000",
    },
    subheader: {
        fontSize: 18,
        color: "#bbb",
    },
    noDevicesMessage: {
        fontSize: 16,
        textAlign: "center",
        padding: 40,
        color: "#666",
    },
    buttonContainer: {
        padding: 15,
        borderTopColor: "#eee",
        borderTopWidth: 1,
    },
    button: ({ pressed }) => ({
        borderRadius: 25,
        padding: 15,
        backgroundColor: pressed ? "darkgreen" : "green",
    }),
    buttonText: {
        alignSelf: "center",
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
    },
    rowBack: {
        alignItems: "center",
        backgroundColor: "red",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: "center",
        bottom: 0,
        justifyContent: "center",
        position: "absolute",
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: "red",
        right: 0,
    },
    backTextWhite: {
        color: "#FFF",
    },
});

export default SettingsStackScreen;
