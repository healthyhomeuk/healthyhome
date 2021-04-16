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
import { StyleSheet, View, Text } from "react-native";
import { getStyleFromLevel } from "./SensorData";
import ArcGradient from "./ArcGradient";
import Style from "../assets/Style";

const message = {
    excellent: "Excellent air quality!",
    good: "Good!",
    fair: "You might need to ventilate the room",
    poor: "There a risk of irritation. Increase ventilation.",
    bad: "The air is heavily polluted",
    very_bad: "The air quality would cause severe health issues",
    severe: "The air is extremely polluted, avoid presence in room",
};

const messageGetters = (level) => {
    switch (level) {
        case "EXCELLENT":
            return message.excellent;
        case "GOOD":
            return message.good;
        case "FAIR":
            return message.fair;
        case "POOR":
            return message.poor;
        case "BAD":
            return message.bad;
        case "VERY_BAD":
            return message.very_bad;
        case "SEVERE":
            return message.severe;
        default:
            return message.unknown;
    }
};

/**
 * Renders air quality.
 */
function AirQuality({ quality, value }) {
    return (
        <View style={styles.airQualityContainer}>
            <Text style={Style.title}>Indoor Air Quality</Text>
            <ArcGradient value={value} />
            <View style={[styles.airQualityStatus, getStyleFromLevel(quality)]}>
                <Text style={styles.airQualityText}>
                    {messageGetters(quality)}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    airQualityContainer: {
        flex: 1,
        flexDirection: "column",
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    airQualityStatus: {
        flex: 1,
        width: "100%",
        height: "20%",
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    airQualityText: {
        color: "#FCF5F5",
        fontSize: 24,
        fontWeight: "bold",
        marginHorizontal: 10,
        marginVertical: 12,
    },
    airQualityValue: {
        color: "#101010",
        fontSize: 62,
        fontWeight: "bold",
        marginHorizontal: 24,
        marginVertical: 12,
    },
});
export default AirQuality;
