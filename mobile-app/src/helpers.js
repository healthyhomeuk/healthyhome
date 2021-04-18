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
