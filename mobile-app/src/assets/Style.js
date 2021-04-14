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

import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

/**
 * Creates a StyleSheet style reference from the given object.
 */
export default StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: "#f2ffea",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2ffea",
        marginVertical: 20,
    },
    text: {
        color: "#101010",
        fontSize: 24,
        fontWeight: "bold",
    },
    title: {
        flex: 1,
        color: "#101010",
        fontSize: 24,
        fontWeight: "bold",
        marginHorizontal: 24,
        marginVertical: 12,
    },
    headerTitle: {
        fontFamily: "Futura",
        fontSize: 20,
        color: "black",
        letterSpacing: 0.5,
    },
    headerContainer: {
        width: "100%",
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f2ffea",
    },
    headerStyle: {
        backgroundColor: "#f2ffea",
        height: 100,
    },
    airQualityCard: {
        elevation: 3,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        width: "100%",
        maxWidth: 0.85 * windowWidth,
        maxHeight: 0.6 * windowHeight,
    },
    genericCard: {
        width: 0.45 * windowWidth,
        height: 0.45 * windowWidth,
    },
});
