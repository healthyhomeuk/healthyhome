import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigationBar from "./navigation/MainNavigationBar";

/**
 * Renders all the components of the app.
 */
export default function App() {
    return (
        <NavigationContainer>
            <MainNavigationBar />
        </NavigationContainer>
    );
}
