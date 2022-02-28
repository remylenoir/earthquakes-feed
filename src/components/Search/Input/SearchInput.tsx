import { x } from "framework";
import React, { ChangeEvent, FC } from "react";

type SearchInputProps = {
  searchQuery: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const SearchInput: FC<SearchInputProps> = ({
  searchQuery,
  onChange,
}) => {
  return (
    <x.input
      type="search"
      defaultValue={searchQuery}
      placeholder="Search for a location"
      data-testid="search-input"
      onChange={onChange}
      backgroundColor="true-gray-100"
      borderWidth={1}
      borderColor="true-gray-300"
      w="100%"
      h="64px"
      p={2}
      fontSize="2xl"
      borderRadius={4}
    />
  );
};
