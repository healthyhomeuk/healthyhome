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
import { StyleSheet, View, Dimensions, Text } from "react-native";
import Style from "../assets/Style";
import { levels, getStyleFromLevel } from "./SensorData";
import AirQuality from "./AirQuality";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

/**
 * Renders the content in the Home component in Card
 * @param {View} props
 * @returns {View}
 */
function Card({
    quality: originalQuality,
    value: originalValue,
    updatedValue,
    isRectangle,
    name,
    unit,
    valueType,
}) {
    const shape = isRectangle ? styles.rectangle : styles.square;
    const value = updatedValue ? updatedValue.value : originalValue;
    const quality = updatedValue ? updatedValue.quality : originalQuality;
    const isValueValid = Number.isFinite(value);

    return (
        <View style={[getStyleFromLevel(quality), styles.card, shape]}>
            <View style={[styles.cardContent]}>
                {isRectangle ? (
                    <AirQuality value={value} quality={quality} />
                ) : (
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "space-between",
                            padding: 15,
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                            }}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 48,
                                    fontWeight: "bold",
                                }}
                            >
                                {isValueValid ? value.toFixed() : "-"}
                                {isValueValid && valueType === "FLOAT" && (
                                    <Text
                                        style={{
                                            color: "white",
                                            fontSize: 24,
                                            paddingTop: 23,
                                            fontWeight: "normal",
                                        }}
                                    >
                                        {(value % 1)
                                            .toFixed(2)
                                            .toString()
                                            .substring(1)}
                                    </Text>
                                )}
                            </Text>
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 24,
                                    marginLeft: "auto",
                                    opacity: 0.8,
                                }}
                            >
                                {unit}
                            </Text>
                        </View>
                        <Text style={{ color: "white", fontSize: 22 }}>
                            {name}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
}

export default Card;

/**
 * @constant {StyleSheet} styles
 */
const styles = StyleSheet.create({
    card: {
        borderRadius: 24,
        marginHorizontal: 4,
        marginVertical: 4,
    },
    cardContent: {
        flex: 1,
    },
    square: {
        width: 0.45 * windowWidth,
        height: 0.45 * windowWidth,
    },
    rectangle: {
        width: 0.9 * windowWidth,
        height: "100%",
        elevation: 3,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        backgroundColor: "#fff",
    },
});
