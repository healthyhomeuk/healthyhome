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
import React from "react";
import { Text, View } from "react-native";
import { DEVICES_NAME } from "../api/fetchers";
import Style from "../assets/Style";

export default function DevicesList({ devices }) {
    return (
        <View
            style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                // borderRadius: 12,
                // borderColor: "#ddd",
                // borderWidth: 1,
                width: "100%",
                padding: 5,
            }}
        >
            {devices.map((device, idx) => (
                <View
                    key={device}
                    style={{
                        width: "100%",
                        borderBottomWidth: idx + 1 === devices.length ? 0 : 1,
                        borderColor: "#ddd",
                        paddingLeft: 15,
                        paddingVertical: 10,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            color: "black",
                        }}
                    >
                        {device ? device.toUpperCase() : "-"}
                    </Text>
                </View>
            ))}
        </View>
    );
}
