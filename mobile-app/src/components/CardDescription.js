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

import React, { useMemo } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import Style from "../assets/Style";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { getStyleFromLevel } from "./SensorData";
import QualityRange from "./QualityRange";

const desc = {
    "IAQ Index":
        "The indoor air quality (IAQ) is a measure of the presence of gases in the air other than those which make up air. It determines the overall safety of the air indoors and whether it is polluted.",
    Temperature:
        "A cool temperature is important in allowing the human body to function normally. Temperatures which are too low or high can worsen chronic conditions and help with the transmission of diseases.",
    "UV Index":
        "The UV index is a measure of the strength of the UV radiation from the sun. Sunlight with a high UV index can cause sunburn. There is a risk of developing skin cancer if exposed to sunlight with high UV index levels over a period of time.",
    Humidity:
        "Relative humidity is a ratio of the current absolute humidity against the highest possible absolute humidity. If it is high, the large presence of water vapour in the air makes it difficult for precipitation to evaporate, making you feel very warm. If it is too low, you will feel much cooler than the actual temperature of the room because the precipitation evaporates very easily.",
    CO2e:
        "The carbon dioxide equivalent (CO2e) is a measure of the presence of carbon dioxide (CO2) and other gases which contribute to the greenhouse effect (e.g., methane).",
    "CO2e Accuracy":
        "The CO2e accuracy is a measure of the accuracy of the CO2e measurement. A zero value means unreliable. From one to three the value has respectively, low, medium and high accuracy.",
    "PM2.5 Particle Count":
        "The PM2.5 particle count is a measure of liquid and solid particles present in the air which are at a diameter of between 1 and 2.5µm. Particulates of this size are easily able to penetrate sensitive parts of the human body and cause respiratory diseases and heart attacks.",
    "PM10 Particle Count":
        "The PM10 particle count is a measure of liquid and solid particles present in the air which are at a diameter of between 7.5 and 10µm. An example of a PM10 particulate is dust. Particulates of this size are easily able to penetrate sensitive parts of the human body and cause respiratory diseases and heart attacks.",
    "PM2.5 Density":
        "The PM2.5 particle density is a measure of the density of PM2.5 particulates in the air.",
    "PM10 Density":
        "The PM10 particle density is a measure of the density of PM10 particulates in the air.",
    "Light Intensity":
        "The light intensity is a measure of the ambient light levels present in the room.",
};

const sources = {
    "IAQ Index": "Bosch Sensortech BME680 datasheet",
    Temperature: "WHO, IAQ UK",
    Humidity: "MOLEKULE, IAQ UK",
    CO2e: "Cooler Future, IAQ UK",
    "PM2.5 Particle Count": "US EPA, kaiterra, IAQ UK",
    "PM10 Particle Count": "US EPA, kaiterra, IAQ UK",
    "PM2.5 Density": "IAQ UK",
    "PM10 Density": "IAQ UK",
};

const CardDescription = React.forwardRef(
    (
        {
            name: sensorName,
            qualityTable,
            paramId,
            value,
            sensorId,
            unit,
            values,
            valueType,
            quality,
        },
        ref
    ) => {
        const sensorValue =
            values[`${sensorId}.${paramId}`]?.value ?? value ?? 0;
        // variables
        const snapPoints = useMemo(() => ["55%", "90%"], []);
        return (
            <BottomSheetModal
                style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 12,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.0,

                    elevation: 24,
                }}
                ref={ref}
                index={0}
                snapPoints={snapPoints}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        padding: 20,
                        paddingTop: 5,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 32,
                            fontWeight: "bold",
                            marginBottom: 10,
                        }}
                    >
                        {sensorName}
                    </Text>
                    <BottomSheetScrollView style={{ flex: 1 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 15,
                                paddingTop: 10,
                            }}
                        >
                            <Text style={{ fontSize: 28 }}>
                                {`${
                                    valueType === "FLOAT"
                                        ? sensorValue.toFixed(2)
                                        : sensorValue.toFixed()
                                } ${unit}`}
                            </Text>
                            <View
                                style={{
                                    ...getStyleFromLevel(quality),
                                    borderRadius: "50%",
                                    width: 20,
                                    height: 20,
                                    marginLeft: 15,
                                }}
                            />
                        </View>
                        {qualityTable?.length > 0 && (
                            <View style={{ width: "100%" }}>
                                <QualityRange qualityTable={qualityTable} />
                            </View>
                        )}
                        <View
                            style={{
                                borderBottomColor: "#eee",
                                borderBottomWidth: 1,
                                marginVertical: 15,
                            }}
                        />
                        <Text
                            style={{
                                color: "#222",
                                fontSize: 16,
                                lineHeight: 20,
                                textAlign: "justify",
                            }}
                        >
                            {desc[sensorName]}
                        </Text>
                        {sources[sensorName] && (
                            <>
                                <Text
                                    style={{
                                        color: "#222",
                                        fontWeight: "bold",
                                        fontSize: 16,
                                        marginTop: 15,
                                    }}
                                >
                                    Sources:
                                </Text>
                                <Text
                                    style={{
                                        color: "#222",
                                        fontSize: 16,
                                    }}
                                >
                                    {sources[sensorName]}
                                </Text>
                            </>
                        )}
                    </BottomSheetScrollView>
                </View>
            </BottomSheetModal>
        );
    }
);

export default CardDescription;
