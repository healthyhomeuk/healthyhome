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
import { StyleSheet, Text, View } from "react-native";

/**
 * This component renders the header of the app.
 * @returns {View}
 */
function Header() {
    return (
        <View style={styles.headerView}>
            <Text style={styles.headerTextStyle}>HealthyHome</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerView: {
        width: "100%",
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f2ffea",
    },
    headerTextStyle: {
        fontFamily: "Futura",
        fontSize: 20,
        color: "black",
        letterSpacing: 0.5,
    },
});
export default Header;
