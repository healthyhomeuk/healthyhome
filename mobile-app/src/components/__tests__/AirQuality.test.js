import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import renderer from "react-test-renderer";

import AirQuality from "../AirQuality";
import Card from "../Card";
import { levels } from "../SensorData";

describe("AirQuality", () => {
    it("renders correctly", async () => {
        const { getAllByText } = render(
            <NavigationContainer>
                <AirQuality />
            </NavigationContainer>
        );
        await waitFor(() => getAllByText("Indoor Air Quality"));
    });

    it("renders status correctly", async () => {
        const iaq = { name: "iaq", value: 77 };
        const props = { ...iaq, unit: "", fetchLevel: levels.GOOD };
        const { getAllByText } = render(
            <NavigationContainer>
                <Card {...props} isRectangle />
            </NavigationContainer>
        );
        await waitFor(() => getAllByText("Looking good!"));
    });

    it("matches snapshot", async () => {
        const iaq = { name: "iaq", value: 77 };
        const props = { ...iaq, unit: "", fetchLevel: levels.MEDIUM };
        const tree = renderer
            .create(
                <NavigationContainer>
                    <Card {...props} isRectangle />
                </NavigationContainer>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
