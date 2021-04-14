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
        case levels.GOOD:
            return sensorStyle.good;
        case levels.MEDIUM:
            return sensorStyle.medium;
        case levels.BAD:
            return sensorStyle.bad;
        default:
            return sensorStyle.unknown;
    }
};

export const sensorStyle = StyleSheet.create({
    good: {
        backgroundColor: "#87c26a",
    },
    medium: {
        backgroundColor: "#efc954",
    },
    bad: {
        backgroundColor: "#c84c4c",
    },
    unknown: {
        backgroundColor: "#eee",
    },
});
