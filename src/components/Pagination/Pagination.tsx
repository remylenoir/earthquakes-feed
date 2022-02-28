import { useDown } from "@xstyled/styled-components";
import { x, styled } from "framework";
import React, { FC } from "react";

const StyledButton = styled.buttonBox`
  min-width: 90px;
  padding: 1;
  appearance: none;
  border-radius: 3;
  border-width: 1;
  background-color: white;
  border-color: blue-gray-300;

  &:hover {
    font-weight: bold;
    color: white;
    border-color: blue-800;
    background-color: blue-800;
  }

  &:disabled {
    font-weight: normal;
    color: cool-gray-400;
    cursor: auto;
    background-color: blue-gray-100;
    border-color: blue-gray-200;
  }
`;

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export const Pagination: FC<PaginationProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const scrollTop = useDown("xl");

  return (
    <x.div
      display="grid"
      gap={2}
      gridAutoFlow="column"
      alignItems="center"
      justifyContent="space-between"
      position={{ xs: "fixed" }}
      left={{ xs: 0 }}
      bottom={{ xs: 0 }}
      backgroundColor="white"
      w={{ xs: "100%" }}
      px={{ xs: 2, sm: 8 }}
      py={2}
      borderTopWidth={{ xs: 1 }}
      borderTopColor="blue-gray-300"
    >
      <StyledButton
        onClick={() => {
          scrollTop && window.scrollTo({ top: 0, behavior: "smooth" });
          setCurrentPage(currentPage - 1);
        }}
        disabled={currentPage === 1}
        data-testid="previous-page"
      >
        Previous
      </StyledButton>

      <x.div>
        Page {currentPage}/{totalPages}
      </x.div>

      <StyledButton
        onClick={() => {
          scrollTop && window.scrollTo({ top: 0, behavior: "smooth" });
          setCurrentPage(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
        data-testid="next-page"
      >
        Next
      </StyledButton>
    </x.div>
  );
};
