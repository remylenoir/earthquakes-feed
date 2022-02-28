import { render, screen } from "@testing-library/react";
import { searchResultsMock } from "../mock/earthquakes-mock";
import { LatestEventsCards } from "./LatestEventsCards";

const earthquakes = searchResultsMock.features;

describe("LatestEventsCards", () => {
  it("should render the latest events screen", () => {
    render(
      <LatestEventsCards
        isLoading={false}
        earthquakes={earthquakes}
        onRefresh={() => null}
      />
    );

    const searchResultList = screen.queryByTestId("latest-events");
    const isLoading = screen.queryByTestId("latest-events--loading");

    expect(isLoading).not.toBeInTheDocument();
    expect(searchResultList).toBeInTheDocument();
  });

  it("should render the loading screen", () => {
    render(
      <LatestEventsCards
        isLoading={true}
        earthquakes={earthquakes}
        onRefresh={() => null}
      />
    );

    const searchResultList = screen.queryByTestId("latest-events");
    const isLoading = screen.queryByTestId("latest-events--loading");

    expect(isLoading).toBeInTheDocument();
    expect(searchResultList).not.toBeInTheDocument();
  });
});
