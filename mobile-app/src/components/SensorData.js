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

import { StyleSheet } from "react-native";

export const levels = {
    GOOD: 1,
    MEDIUM: 2,
    BAD: 3,
};

export const units = {
    pm25: "µg/m3",
    pm10: "µg/m3",
    co2: "ppm",
    temp: "ºC",
    humidity: "%",
};

export const getStyleFromLevel = (level) => {
    switch (level) {
        case "EXCELLENT":
            return sensorStyle.excellent;
        case "GOOD":
            return sensorStyle.good;
        case "FAIR":
            return sensorStyle.fair;
        case "POOR":
            return sensorStyle.poor;
        case "BAD":
            return sensorStyle.bad;
        case "VERY_BAD":
            return sensorStyle.very_bad;
        case "SEVERE":
            return sensorStyle.severe;
        default:
            return sensorStyle.unknown;
    }
};

export const sensorColors = {
    excellent: {
        backgroundColor: "#008000",
    },
    good: {
        backgroundColor: "#9ACD32",
    },
    fair: {
        backgroundColor: "#F8E115",
    },
    poor: {
        backgroundColor: "#FFA500",
    },
    bad: {
        backgroundColor: "#EF0000",
    },
    very_bad: {
        backgroundColor: "#800080",
    },
    severe: {
        backgroundColor: "#A52A2A",
    },
    unknown: {
        backgroundColor: "#a9a9a9",
    },
};

export const sensorStyle = StyleSheet.create(sensorColors);
