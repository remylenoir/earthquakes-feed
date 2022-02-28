import { Str } from "./string";

describe("pluralise", () => {
  it("should pluralise the string if count is bigger than 1", () => {
    expect(Str.pluralise(["foo"].length, "result", "s")).toEqual("result");
    expect(Str.pluralise(["foo", "bar"].length, "result", "s")).toEqual(
      "results"
    );
  });
});
