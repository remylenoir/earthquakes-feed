import { render, screen, fireEvent } from "@testing-library/react";
import { SearchInput } from "./SearchInput";

describe("SearchInput", () => {
  it("should render the component and find its data-testid attribute", () => {
    render(<SearchInput onChange={() => null} searchQuery="" />);

    const searchInput = screen.getByTestId("search-input");

    expect(searchInput).toBeInTheDocument();
  });

  it("should update the typed value", async () => {
    render(<SearchInput onChange={() => null} searchQuery="Hello" />);

    const searchInput = await screen.findByTestId<HTMLInputElement>(
      "search-input"
    );

    expect(searchInput.value).toEqual("Hello");

    fireEvent.change(searchInput, { target: { value: "Foo" } });

    expect(searchInput.value).toEqual("Foo");
    expect(searchInput.value).not.toEqual("Hello");
  });
});
