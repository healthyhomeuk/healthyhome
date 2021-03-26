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
import Style from "../assets/Style";

const message = {
    goodQuality: {
        text: "Looking good!",
        color: "#87c26a",
    },
    mediumQuality: {
        text: "It's okay.",
        color: "#efc954",
    },
    badQuality: {
        text: "Immediate changes required!",
        color: "#c84c4c",
    },
};
/**
 * Renders air quality.
 */
function AirQuality(props) {
    let quality;
    if (props.value <= 60) {
        quality = message.goodQuality;
    } else if (props.value <= 100) {
        quality = message.mediumQuality;
    } else {
        quality = message.badQuality;
    }
    return (
        <View style={styles.airQualityContainer}>
            <Text style={Style.title}>Indoor Air Quality</Text>
            <Text style={styles.airQualityValue}>{props.value}</Text>
            <View
                style={{
                    ...styles.airQualityStatus,
                    backgroundColor: quality.color,
                }}
            >
                <Text style={styles.airQualityText}>{quality.text}</Text>
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
        flex: 1,
        color: "#101010",
        fontSize: 50,
        fontWeight: "bold",
        marginHorizontal: 24,
        marginVertical: 12,
    },
});
export default AirQuality;
