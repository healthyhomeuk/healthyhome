import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

import NavBar from "../Navbar";

describe("NavBar", () => {
    it("renders the correct screen", async () => {
        const { getAllByText } = render(
            <NavigationContainer>
                <NavBar />
            </NavigationContainer>
        );
        await waitFor(() => getAllByText("Home"));
    });
});
