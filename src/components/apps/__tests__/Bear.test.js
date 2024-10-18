import React from "react";
import { render } from "@testing-library/react";
import Bear from "../Bear";

test("renders Bear component without crashing", () => {
  render(<Bear />);
});
