import "react-native";
import React from "react";
import Settings from "../Settings";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import { NavigationContainer } from "@react-navigation/native";
import SettingsStackScreen from "../Settings";

it("renders correctly", () => {
    renderer.create(
        <NavigationContainer>
            <SettingsStackScreen />
        </NavigationContainer>
    );
});
