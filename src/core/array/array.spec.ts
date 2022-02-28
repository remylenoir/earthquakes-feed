import { Arr } from "./array";

describe("sortBy", () => {
  const people = [
    { name: "Morty Smith", age: 14 },
    { name: "Pickle Rick", age: 70 },
    { name: "Jerry Smith", age: 35 },
  ];

  const sortedByAge = [
    { name: "Morty Smith", age: 14 },
    { name: "Jerry Smith", age: 35 },
    { name: "Pickle Rick", age: 70 },
  ];

  it("should sort the array elements with the given projection", () => {
    expect(
      Arr.sortBy((x: { name: string; age: number }) => x.age, "asc")(people)
    ).toEqual(sortedByAge);
    expect(
      Arr.sortBy((x: { name: string; age: number }) => x.age, "desc")(people)
    ).not.toEqual(sortedByAge);
  });
});

describe("paginate", () => {
  it("should paginate the array elements with the given parameters", () => {
    expect(Arr.paginate(["foo", "bar", "morty"], 2, 1)).toEqual(["foo", "bar"]);
    expect(Arr.paginate(["foo", "bar", "morty"], 2, 2)).toEqual(["morty"]);
  });
});
