import { render, screen } from "@testing-library/react";
import { searchResultsMock } from "../../mock/earthquakes-mock";
import { SearchResultList } from "./SearchResultList";

const searchResults = searchResultsMock.features;
const defaultSorting = `time-desc`;

describe("SearchResultList", () => {
  it("should render the results screen", () => {
    render(
      <SearchResultList
        isLoading={false}
        searchQuery="kansas"
        searchResults={searchResults}
      />
    );

    const searchResultList = screen.queryByTestId(
      `search-result-list--${defaultSorting}`
    );
    const isLoading = screen.queryByTestId("search-result-list--loading");
    const noResults = screen.queryByTestId("search-result-list--no-results");

    expect(noResults).not.toBeInTheDocument();
    expect(isLoading).not.toBeInTheDocument();
    expect(searchResultList).toBeInTheDocument();
  });

  it("should render the loading screen", () => {
    render(
      <SearchResultList
        isLoading={true}
        searchQuery="kansas"
        searchResults={searchResults}
      />
    );

    const searchResultList = screen.queryByTestId(
      `search-result-list--${defaultSorting}`
    );
    const isLoading = screen.queryByTestId("search-result-list--loading");
    const noResults = screen.queryByTestId("search-result-list--no-results");

    expect(isLoading).toBeInTheDocument();
    expect(noResults).not.toBeInTheDocument();
    expect(searchResultList).not.toBeInTheDocument();
  });

  it("should render the no results screen", () => {
    render(
      <SearchResultList
        isLoading={false}
        searchQuery="kansas"
        searchResults={undefined}
      />
    );

    const searchResultList = screen.queryByTestId(
      `search-result-list--${defaultSorting}`
    );
    const isLoading = screen.queryByTestId("search-result-list--loading");
    const noResults = screen.queryByTestId("search-result-list--no-results");

    expect(noResults).toBeInTheDocument();
    expect(isLoading).not.toBeInTheDocument();
    expect(searchResultList).not.toBeInTheDocument();
  });
});
