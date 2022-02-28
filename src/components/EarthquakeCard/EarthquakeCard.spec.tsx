import { render, screen } from "@testing-library/react";
import { EarthquakeCard } from "./EarthquakeCard";

describe("EarthquakeCard", () => {
  it("should render the component and find its data-testid attribute", () => {
    render(
      <EarthquakeCard id="1" magnitude={3} place="Alaska" time={1} url="url" />
    );

    const earthquakeCard = screen.getByTestId("earthquake-card-1");

    expect(earthquakeCard).toBeInTheDocument();
  });
});
