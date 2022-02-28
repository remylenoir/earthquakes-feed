/**
 * Group of related Array functions.
 */
export const Arr = {
  /**
   * Sorts an array with the given projection function.
   * @param projection projection function, returning the value to be compared from the value in the array.
   * @param order the sorting order, defaults to ascending (low to high)
   * @param arr the array to be sorted.
   * @returns a sorted copy of the provided array.
   */
  sortBy:
    <A, B>(projection: (a: A) => B, order: "asc" | "desc" = "asc") =>
    (arr: A[]): A[] =>
      [...arr].sort((a, b) => {
        const fst = projection(a);
        const snd = projection(b);

        if (fst < snd) {
          return order === "asc" ? -1 : 1;
        }
        if (fst > snd) {
          return order === "asc" ? 1 : -1;
        }

        return 0;
      }),
  /**
   * Paginates an array with the given parameters.
   * @param arr the array to be paginated.
   * @param page_size the amount of items to show per page
   * @param page_number the current page number
   * @returns the paginated array.
   */
  paginate: <A>(arr: A[], page_size: number, page_number: number): A[] =>
    arr.slice((page_number - 1) * page_size, page_number * page_size),
};
