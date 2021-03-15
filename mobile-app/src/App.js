import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import NavBar from "./components/Navbar";

/**
 * Renders all the components of the app.
 */
export default function App() {
    return (
        <NavigationContainer>
            <NavBar />
        </NavigationContainer>
    );
}
