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
    Switch,
    Keyboard,
    TouchableWithoutFeedback,
    StyleSheet,
    Pressable,
} from "react-native";
import { BottomSheetModal, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import Style from "../assets/Style";
import { useDevice } from "../DeviceProvider";
import DevicesList from "./DevicesList";

const AddNewServer = React.forwardRef((props, ref) => {
    const { connectToServer, connecting, setConnecting } = useDevice();
    const [hostname, setHostname] = useState("");

    const connect = () => {
        console.log(ref);
        console.log(hostname);
        props.connect(hostname);
    };

    // variables
    const snapPoints = useMemo(() => ["37%"], []);

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
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"
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
                        Register new server
                    </Text>
                    <View style={{ flex: 1, width: "100%" }}>
                        <Text style={{ marginBottom: 10, fontSize: 15 }}>
                            Enter here the hostname or IP address of your
                            HealthyHome RPi to connect to it.
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
                                marginBottom: 5,
                            }}
                        >
                            {`Server hostname/IP address`}
                        </Text>
                        <BottomSheetTextInput
                            onSubmitEditing={() => connect()}
                            onChangeText={setHostname}
                            style={{
                                height: 40,
                                borderWidth: 1,
                                borderRadius: 10,
                                paddingHorizontal: 15,
                                fontSize: 16,
                                marginBottom: 15,
                                borderColor: "#ccc",
                            }}
                            defaultValue={hostname}
                            placeholder="e.g. raspberrypi.local"
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Pressable
                            onPress={() => {
                                Keyboard.dismiss();
                                connect();
                            }}
                            style={styles.button(connecting === hostname)}
                        >
                            {connecting === hostname ? (
                                <ActivityIndicator color="white" size="large" />
                            ) : (
                                <Text style={styles.buttonText}>Connect</Text>
                            )}
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
    button: (connecting) => ({ pressed }) => ({
        borderRadius: 25,
        padding: connecting ? 10 : 15,
        backgroundColor: pressed && !connecting ? "darkgreen" : "green",
    }),
    buttonText: {
        alignSelf: "center",
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
    },
});

export default AddNewServer;
