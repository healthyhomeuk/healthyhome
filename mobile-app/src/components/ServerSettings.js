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
    Text,
    View,
    TextInput,
    Switch,
    Keyboard,
    TouchableWithoutFeedback,
    StyleSheet,
    Pressable,
} from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Style from "../assets/Style";
import { useDevice } from "../DeviceProvider";
import DevicesList from "./DevicesList";

const ServerSettings = React.forwardRef((props, ref) => {
    const {
        server: { object, name, devices },
        setServerName,
    } = useDevice();

    const [isEnabled, setEnable] = useState(false);
    const toggleSwitch = () => {
        setEnable(!isEnabled);
    };

    // variables
    const snapPoints = useMemo(() => ["60%"], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        console.log("handleSheetChanges", index);
    }, []);
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
            onChange={handleSheetChanges}
        >
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
                <Text
                    style={{
                        color: "#101010",
                        fontSize: 18,
                        marginBottom: 5,
                    }}
                >
                    {`Server name`}
                </Text>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <TextInput
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
                            width: "100%",
                            fontSize: 16,
                            marginBottom: 15,
                            borderColor: "#ccc",
                        }}
                        defaultValue={name}
                        placeholder="Change server name"
                    />
                </TouchableWithoutFeedback>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        width: "100%",
                        marginBottom: 15,
                    }}
                >
                    <Text style={{ fontSize: 18, paddingBottom: 5 }}>
                        Enable push notifications
                    </Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "75D048" }}
                        thumbColor={isEnabled ? "#f7f7f7" : "#DEDEDE"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <Text
                    style={{
                        color: "#101010",
                        fontSize: 18,
                        paddingBottom: 5,
                    }}
                >
                    Registered Devices
                </Text>
                <View style={{ flex: 1, width: "100%" }}>
                    <DevicesList devices={devices} />
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable
                        onPress={() => alert("ya fool!")}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Disconnect</Text>
                    </Pressable>
                </View>
            </View>
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
    button: {
        borderRadius: 25,
        padding: 15,
        backgroundColor: "#ef0000",
    },
    buttonText: {
        alignSelf: "center",
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
    },
});

export default ServerSettings;
