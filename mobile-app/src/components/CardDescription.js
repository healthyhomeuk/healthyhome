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

const desc = {
    iaq:
        "The indoor air quality (IAQ) is a measure of the presence of gases in the air other than those which make up air. It determines the overall safety of the air indoors and whether it is polluted.\nSource: IAQUK",
    temperature:
        "A cool temperature is important in allowing the human body to function normally. Temperatures which are too low or high can worsen chronic conditions and help with the transmission of diseases.",
    uv:
        "The UV index is a measure of the strength of the UV radiation from the sun. Sunlight with a high UV index can cause sunburn. There is a risk of developing skin cancer if exposed to sunlight with high UV index levels over a period of time.",
    humidity:
        "Relative humidity is a ratio of the current absolute humidity against the highest possible absolute humidity. If it is high, the large presence of water vapour in the air makes it difficult for precipitation to evaporate, making you feel very warm. If it is too low, you will feel much cooler than the actual temperature of the room because the precipitation evaporates very easily.\nSource: MOLEKULE",
    co2e:
        "The carbon dioxide equivalent (CO2e) is a measure of the presence of carbon dioxide (CO2) and other gases which contribute to the greenhouse effect (e.g., methane).\nSource: Cooler Future",
    co2acc:
        "The CO2e accuracy is a measure of the accuracy of the CO2e measurement.",
    particle25:
        "The PM2.5 particle count is a measure of liquid and solid particles present in the air which are at a diameter of between 1 and 2.5µm. Particulates of this size are easily able to penetrate sensitive parts of the human body and cause respiratory diseases and heart attacks.\nSources: US EPA and kaiterra",
    particle10:
        "The PM10 particle count is a measure of liquid and solid particles present in the air which are at a diameter of between 7.5 and 10µm. An example of a PM10 particulate is dust. Particulates of this size are easily able to penetrate sensitive parts of the human body and cause respiratory diseases and heart attacks.\nSources: US EPA and kaiterra",
    density25:
        "The PM2.5 particle density is a measure of the density of PM2.5 particulates in the air.",
    density10:
        "The PM10 particle density is a measure of the density of PM10 particulates in the air.",
    light:
        "The light intensity is a measure of the ambient light levels present in the room.",
};

const descGetter = (name) => {
    switch (name) {
        case "IAQ Index":
            return desc.iaq;
        case "Temperature":
            return desc.temperature;
        case "Humidity":
            return desc.humidity;
        case "UV Index":
            return desc.uv;
        case "Light Intensity":
            return desc.light;
        case "PM10 Particle Count":
            return desc.particle10;
        case "PM10 Density":
            return desc.density10;
        case "PM2.5 Particle Count":
            return desc.particle25;
        case "PM2.5 Density":
            return desc.density25;
        case "CO2e":
            return desc.co2e;
        case "CO2e Accuracy":
            return desc.co2acc;
    }
};
const Description = ({
    sensorId,
    qualityTable,
    paramId,
    value: sensorValue,
    name: sensorName,
}) => {
    <View
        style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
        }}
    >
        <Text>{sensorName}</Text>
        <Text>{descGetter(sensorName)}</Text>
    </View>;
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

        const tables = qualityTable;
        // variables
        const snapPoints = useMemo(() => ["70%"], []);
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
                        <Text
                            style={{
                                color: "#101010",
                                fontSize: 14,
                                marginBottom: 5,
                            }}
                        >
                            {descGetter(sensorName)}
                        </Text>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 15,
                                paddingTop: 10,
                                borderTopWidth: 1,
                                borderTopColor: "#eee",
                                // borderBottomWidth: 1,
                                // borderBottomColor: "#eee",
                            }}
                        >
                            <Text style={{ fontSize: 18 }}>Current Value</Text>
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
                        <Text style={{ marginBottom: 10, fontSize: 14 }}>
                            {`${
                                valueType === "FLOAT"
                                    ? sensorValue.toFixed(2)
                                    : sensorValue.toFixed()
                            } ${unit}`}
                        </Text>
                        <View
                            style={{
                                borderBottomColor: "#eee",
                                borderBottomWidth: 1,
                                marginBottom: 10,
                            }}
                        />
                        <Text
                            style={{
                                color: "#101010",
                                fontSize: 18,
                                paddingBottom: 5,
                            }}
                        >
                            Quality Values
                        </Text>
                        <View style={{ width: "100%" }}>
                            {/* {tables ??
                                tables.map((qualityTable) => {
                                    <View
                                        key={qualityTable.qualityValue}
                                        style={{
                                            width: "100%",
                                            borderBottomWidth:
                                                idx + 1 === devices.length
                                                    ? 0
                                                    : 1,
                                            borderColor: "#ddd",
                                            paddingLeft: 15,
                                            paddingVertical: 10,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                color: "black",
                                            }}
                                        >
                                            {qualityTable.qualityValue}
                                        </Text>
                                    </View>;
                                })} */}
                        </View>
                    </BottomSheetScrollView>
                </View>
            </BottomSheetModal>
        );
    }
);

export default CardDescription;
