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
function Card({ quality, value, isRectangle, name, unit }) {
    const shape = isRectangle ? styles.rectangle : styles.square;
    const iaq = name === "iaq" ? name : "";
    return (
        <View style={[getStyleFromLevel(quality), styles.card, shape]}>
            <View style={[styles.cardContent]}>
                {iaq && isRectangle ? (
                    <AirQuality value={value} quality={quality} />
                ) : (
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 42,
                                    fontWeight: "bold",
                                }}
                            >
                                {value}
                            </Text>
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 18,
                                }}
                            >
                                {unit}
                            </Text>
                        </View>
                        <Text>{name}</Text>
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
        alignItems: "center",
        justifyContent: "center",
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
