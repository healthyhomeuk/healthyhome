import "react-native";
import React from "react";
import Home from "../Home";

import renderer from "react-test-renderer";

it("renders correctly", () => {
    renderer.create(<Home />);
});
