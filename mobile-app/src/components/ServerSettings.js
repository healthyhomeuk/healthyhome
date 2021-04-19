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

import { useQuery } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import React, {
    useEffect,
    useState,
    useRef,
    useMemo,
    useCallback,
} from "react";
import {
    ActivityIndicator,
    Text,
    View,
    TextInput,
    Switch,
    Keyboard,
    TouchableWithoutFeedback,
    StyleSheet,
    Pressable,
} from "react-native";
import {
    BottomSheetModal,
    BottomSheetScrollView,
    BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import Style from "../assets/Style";
import { useDevice } from "../DeviceProvider";
import DevicesList from "./DevicesList";
import * as helpers from "../helpers";

const ServerSettings = React.forwardRef((props, ref) => {
    const {
        server: { name, devices, hasNotifications },
        setServerName,
        registerNotifications,
        disconnect,
    } = useDevice();

    async function registerForNotifications() {
        const token = await helpers.registerForPushNotificationsAsync();
        return await registerNotifications(token);
    }

    const [notificationsLoading, setNotifLoading] = useState(false);
    const [isEnabled, setEnable] = useState(hasNotifications);
    const toggleSwitch = () => {
        setNotifLoading(true);

        registerForNotifications()
            .then((hasNotifications) => {
                setEnable(hasNotifications);
            })
            .catch((err) => {
                console.error(err);
                alert("Could not enable push notifications!");
            })
            .finally(() => {
                setNotifLoading(false);
            });
    };

    // variables
    const snapPoints = useMemo(() => ["70%"], []);

    const disconnectFromServer = () => {
        ref.current.dismiss();
        disconnect().catch(console.error);
    };

    return (
        <BottomSheetModal
            style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 12,
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.0,

                elevation: 24,
            }}
            ref={ref}
            index={0}
            snapPoints={snapPoints}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        padding: 20,
                        paddingTop: 5,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 32,
                            fontWeight: "bold",
                            marginBottom: 10,
                        }}
                    >
                        Server settings
                    </Text>
                    <BottomSheetScrollView style={{ flex: 1 }}>
                        <Text
                            style={{
                                color: "#101010",
                                fontSize: 18,
                                marginBottom: 5,
                            }}
                        >
                            {`Server name`}
                        </Text>
                        <BottomSheetTextInput
                            onSubmitEditing={(event) => {
                                const text = event.nativeEvent.text;
                                if (text.trim().length > 0)
                                    setServerName(event.nativeEvent.text);
                                else {
                                    alert("It cannot be empty");
                                }
                            }}
                            style={{
                                height: 40,
                                borderWidth: 1,
                                borderRadius: 10,
                                paddingHorizontal: 15,
                                fontSize: 16,
                                marginBottom: 15,
                                borderColor: "#ccc",
                            }}
                            defaultValue={name}
                            placeholder="Change server name"
                        />

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 15,
                                paddingTop: 10,
                                borderTopWidth: 1,
                                borderTopColor: "#eee",
                                // borderBottomWidth: 1,
                                // borderBottomColor: "#eee",
                            }}
                        >
                            <Text style={{ fontSize: 18 }}>
                                Enable push notifications
                            </Text>
                            {notificationsLoading ? (
                                <ActivityIndicator />
                            ) : (
                                <Switch
                                    trackColor={{
                                        false: "#767577",
                                        true: "#75D048",
                                    }}
                                    thumbColor={
                                        isEnabled ? "#f7f7f7" : "#DEDEDE"
                                    }
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />
                            )}
                        </View>
                        <Text style={{ marginBottom: 10 }}>
                            Push notifications will warn you istantaneously
                            whenever a parameter will degrade to a subpar level.
                            You can disable them later in the server settings.
                        </Text>
                        <View
                            style={{
                                borderBottomColor: "#eee",
                                borderBottomWidth: 1,
                                marginBottom: 10,
                            }}
                        />
                        <Text
                            style={{
                                color: "#101010",
                                fontSize: 18,
                                paddingBottom: 5,
                            }}
                        >
                            Registered Devices
                        </Text>
                        <View style={{ width: "100%" }}>
                            <DevicesList devices={devices} />
                        </View>
                    </BottomSheetScrollView>
                    <View style={styles.buttonContainer}>
                        <Pressable
                            onPress={disconnectFromServer}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Disconnect</Text>
                        </Pressable>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </BottomSheetModal>
    );
});

const styles = StyleSheet.create({
    buttonContainer: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderTopColor: "#eee",
        borderTopWidth: 1,
        width: "100%",
    },
    button: ({ pressed }) => ({
        borderRadius: 25,
        padding: 15,
        backgroundColor: pressed ? "#bf0000" : "#ef0000",
    }),
    buttonText: {
        alignSelf: "center",
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
    },
});

export default ServerSettings;
