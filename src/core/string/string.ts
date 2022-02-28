/**
 * Group of related String functions.
 */
export const Str = {
  /**
   * Pluralises a word with the given suffix if amount is greater than 1.
   * @param amount the amount number
   * @param word the singular word to pluralise
   * @param suffix the suffix to append to the singular word
   * @returns the initial or pluralised word.
   */
  pluralise: (amount: number, word: string, suffix: string): string => {
    if (amount > 1) {
      return word.concat(suffix);
    }

    return word;
  },
};
