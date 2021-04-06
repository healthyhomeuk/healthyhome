import { StyleSheet } from "react-native";

export const levels = {
    GOOD: 1,
    MEDIUM: 2,
    BAD: 3,
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
