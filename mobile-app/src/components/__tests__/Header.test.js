import React from "react";
import {
    render,
    fireEvent,
    waitFor,
    cleanup,
} from "@testing-library/react-native";

import Header from "../Header";

afterEach(cleanup);

describe("Header", () => {
    it("should have the correct text", async () => {
        const { getByText } = render(<Header />);
        await waitFor(() => getByText("HealthyHome"));
    });
});
