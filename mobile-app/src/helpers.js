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

import { Platform } from "react-native";
import * as Application from "expo-application";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import * as SecureStore from "expo-secure-store";
import { AsyncStorage } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

export async function getDeviceId() {
    if (Platform.OS === "android") {
        return Application.androidId;
    } else {
        const deviceId = await SecureStore.getItemAsync("deviceId");
        if (deviceId) {
            return deviceId;
        } else {
            const uuid = uuidv4();
            SecureStore.setItemAsync("deviceId", uuid);
            return uuid;
        }
    }
}

export function lastServer() {
    return AsyncStorage.getItem("lastServerHostname");
}

export function saveServerAsLast(hostname) {
    AsyncStorage.setItem("lastServerHostname", hostname);
}

export function getSavedServers() {
    return AsyncStorage.getItem("savedServers").then((item) => {
        return item !== null ? JSON.parse(item) : [];
    });
}

export async function saveServer(server) {
    const savedServers = await getSavedServers();
    const idx = savedServers.findIndex((el) => el.hostname === server.hostname);

    if (idx > -1) {
        savedServers[idx] = server;
    } else {
        savedServers.push(server);
    }

    await AsyncStorage.setItem("savedServers", JSON.stringify(savedServers));
    return true;
}

export async function deleteServer(hostname) {
    const savedServers = await getSavedServers();
    if (!savedServers.find((el) => el === hostname)) return false;
    const newList = savedServers.filter((el) => el !== hostname);
    await AsyncStorage.setItem("savedServers", JSON.stringify(savedServers));
    return true;
}

export async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const {
            status: existingStatus,
        } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    return token;
}
