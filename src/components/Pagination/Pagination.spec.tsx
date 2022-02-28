import { render, screen } from "@testing-library/react";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("Should have the previous button disabled on page 1/3", () => {
    render(
      <Pagination totalPages={3} currentPage={1} setCurrentPage={() => null} />
    );

    const previousPageButton = screen.getByTestId("previous-page");

    expect(previousPageButton).toBeDisabled();
  });

  it("Should have the previous button enabled on page 2/3", () => {
    render(
      <Pagination totalPages={3} currentPage={2} setCurrentPage={() => null} />
    );

    const previousPageButton = screen.getByTestId("previous-page");

    expect(previousPageButton).not.toBeDisabled();
  });

  it("Should have the next button enabled on page 1/3", () => {
    render(
      <Pagination totalPages={3} currentPage={1} setCurrentPage={() => null} />
    );

    const nextPageButton = screen.getByTestId("next-page");

    expect(nextPageButton).not.toBeDisabled();
  });

  it("Should have the next button disabled on page 3/3", () => {
    render(
      <Pagination totalPages={3} currentPage={3} setCurrentPage={() => null} />
    );

    const nextPageButton = screen.getByTestId("next-page");

    expect(nextPageButton).toBeDisabled();
  });
});
