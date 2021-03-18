import "react-native";
import React from "react";
import App from "../src/App";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

it("renders correctly", async () => {
    const { getAllByText } = render(<App />);
    await waitFor(() => getAllByText("Home"));
});
