/*
 * This file is part of the HealthyHome project monitoring server
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
import { levels, getStyleFromLevel } from "./SensorData";
import ArcGradient from "./ArcGradient";
import Style from "../assets/Style";

const message = {
    goodQuality: "Looking good!",
    mediumQuality: "It's okay.",
    badQuality: "Immediate changes required!",
};

const messageGetters = (level) => {
    switch (level) {
        case levels.GOOD:
            return message.goodQuality;
        case levels.MEDIUM:
            return message.mediumQuality;
        case levels.BAD:
            return message.badQuality;
        default:
            return "";
    }
};
/**
 * Renders air quality.
 */
function AirQuality({ level, value }) {
    console.log(messageGetters(level));
    return (
        <View style={styles.airQualityContainer}>
            <Text style={Style.title}>Indoor Air Quality</Text>
            <ArcGradient />
            <Text style={styles.airQualityValue}>{value}</Text>
            <View style={[styles.airQualityStatus, getStyleFromLevel(level)]}>
                <Text style={styles.airQualityText}>
                    {messageGetters(level)}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    airQualityContainer: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    airQualityStatus: {
        width: "100%",
        height: "15%",
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
        position: "absolute",
        color: "#101010",
        fontSize: 50,
        fontWeight: "bold",
        marginHorizontal: 24,
        marginVertical: 12,
    },
});
export default AirQuality;
