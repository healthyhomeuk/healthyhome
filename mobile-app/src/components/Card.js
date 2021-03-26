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
import { StyleSheet, View, Dimensions } from "react-native";
import Style from "../assets/Style";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

/**
 * Renders the content in the Home component in Card
 * @param {View} props
 * @returns {View}
 */
function Card(props) {
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>{props.children}</View>
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
        elevation: 3,
        backgroundColor: "#fff",
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 4,
        width: 0.9 * windowWidth,
        height: 0.6 * windowHeight,
    },
    cardContent: {
        alignItems: "center",
    },
});
