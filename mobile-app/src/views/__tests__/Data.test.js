import "react-native";
import React from "react";
import DataStackScreen from "../Data";
import { NavigationContainer } from "@react-navigation/native";
import renderer from "react-test-renderer";

it("renders correctly", () => {
    renderer.create(
        <NavigationContainer>
            <DataStackScreen />
        </NavigationContainer>
    );
});
