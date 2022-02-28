import { render, screen } from "@testing-library/react";
import { App } from "./App";

describe("App", () => {
  it("should render the component and find its data-testid attribute", () => {
    render(<App />);

    const dataTestId = screen.getByTestId("app");

    expect(dataTestId).toBeInTheDocument();
  });
});
