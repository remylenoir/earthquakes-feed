import { Arr, Str } from "core";
import { Earthquake, x } from "framework";
import React, { FC, useMemo, useState } from "react";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import { EarthquakeCard } from "components/EarthquakeCard";
import { Pagination } from "components/Pagination";

type Sort = { type: "magnitude" | "time"; order: "asc" | "desc" };

type SearchResultListProps = {
  isLoading: boolean;
  searchResults: Earthquake[] | undefined;
  searchQuery: string;
};

export const SearchResultList: FC<SearchResultListProps> = ({
  isLoading,
  searchResults,
  searchQuery,
}) => {
  //
  const [sortBy, setSortBy] = useState<Sort>({ type: "time", order: "desc" });

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = searchResults ? Math.ceil(searchResults.length / 10) : 1;

  /**
   * Memoized version the sorted array
   */
  const sortedResults = useMemo(() => {
    const sortedResults = Arr.sortBy((x: Earthquake) => {
      if (sortBy.type === "time") {
        return new Date(x.properties.time).getTime();
      }

      if (sortBy.type === "magnitude") {
        return x.properties.mag;
      }
    }, sortBy.order)(searchResults || []);

    return sortedResults;
  }, [searchResults, sortBy]);

  return (
    <>
      {!isLoading && sortedResults && sortedResults.length > 0 ? (
        <x.div
          px={{ xs: 4, sm: 8 }}
          pb={{ xs: 8, sm: 8, xl: 0 }}
          mt={3}
          data-testid={`search-result-list--${sortBy.type}-${sortBy.order}`}
        >
          <x.h2 fontSize="4xl" fontWeight="bold" textAlign="center">
            {sortedResults.length}{" "}
            {Str.pluralise(sortedResults.length, "Result", "s")} for "
            {searchQuery}"
          </x.h2>

          <x.div
            mt={1}
            fontSize="sm"
            display="grid"
            gap={0.5}
            gridAutoFlow="column"
            alignItems="center"
            justifyContent="center"
          >
            <AdjustmentsIcon width={16} height={16} />

            <x.div
              display="grid"
              gap={0.5}
              gridAutoFlow="column"
              alignItems="center"
              justifyContent="start"
            >
              Sort by{" "}
              <x.button
                appearance="none"
                p={0.5}
                borderWidth={1}
                borderRadius={3}
                borderColor="true-gray-300"
                color={sortBy.type === "magnitude" ? "blue-800" : "inherit"}
                backgroundColor={
                  sortBy.type === "magnitude" ? "blue-100" : "transparent"
                }
                onClick={() => setSortBy({ ...sortBy, type: "magnitude" })}
              >
                magnitude
              </x.button>{" "}
              |{" "}
              <x.button
                appearance="none"
                p={0.5}
                borderWidth={1}
                borderRadius={3}
                borderColor="true-gray-300"
                color={sortBy.type === "time" ? "blue-800" : "inherit"}
                backgroundColor={
                  sortBy.type === "time" ? "blue-100" : "transparent"
                }
                onClick={() => setSortBy({ ...sortBy, type: "time" })}
              >
                time
              </x.button>
              -{" "}
              <x.button
                appearance="none"
                p={0.5}
                borderWidth={1}
                borderRadius={3}
                borderColor="true-gray-300"
                color={sortBy.order === "asc" ? "blue-800" : "inherit"}
                backgroundColor={
                  sortBy.order === "asc" ? "blue-100" : "transparent"
                }
                onClick={() => setSortBy({ ...sortBy, order: "asc" })}
              >
                asc
              </x.button>
              |{" "}
              <x.button
                appearance="none"
                p={0.5}
                borderWidth={1}
                borderRadius={3}
                borderColor="true-gray-300"
                color={sortBy.order === "desc" ? "blue-800" : "inherit"}
                backgroundColor={
                  sortBy.order === "desc" ? "blue-100" : "transparent"
                }
                onClick={() => setSortBy({ ...sortBy, order: "desc" })}
              >
                desc
              </x.button>
            </x.div>
          </x.div>

          <x.div
            mt={3}
            display="grid"
            gap={3}
            gridTemplateColumns={{
              xs: "repeat(auto-fit, 100%)",
              sm: "repeat(auto-fit, 230px)",
            }}
            justifyContent="center"
          >
            {Arr.paginate(sortedResults, 10, currentPage).map((earthquake) => {
              return (
                <EarthquakeCard
                  key={earthquake.id}
                  id={earthquake.id}
                  magnitude={earthquake.properties.mag || -1}
                  place={earthquake.properties.place}
                  time={earthquake.properties.time}
                  url={earthquake.properties.url}
                />
              );
            })}
          </x.div>

          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </x.div>
      ) : (
        <x.div px={{ xs: 4, sm: 8 }} mt={3}>
          {isLoading ? (
            <x.h2
              fontSize="4xl"
              fontWeight="bold"
              textAlign="center"
              data-testid="search-result-list--loading"
            >
              Loading...
            </x.h2>
          ) : (
            <x.h2
              fontSize="4xl"
              fontWeight="bold"
              textAlign="center"
              data-testid="search-result-list--no-results"
            >
              No results, please refine your query
            </x.h2>
          )}
        </x.div>
      )}
    </>
  );
};
