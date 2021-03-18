import "react-native";
import React from "react";
import HomeStackScreen from "../Home";
import { NavigationContainer } from "@react-navigation/native";
import renderer from "react-test-renderer";

it("renders correctly", () => {
    renderer.create(
        <NavigationContainer>
            <HomeStackScreen />
        </NavigationContainer>
    );
});
