import { Earthquake, EarthquakesFeed, x } from "framework";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { LatestEventsCards, SearchInput, SearchResultList } from "components";

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [earthquakes, setEarthquakes] = useState<Earthquake[] | undefined>(
    undefined
  );

  const latestThree = earthquakes?.slice(0, 3);

  /**
   * Fetches the USGS Earthquake API
   * @param signal the abort controller signal
   * @description Takes care of type-guarding the response
   * @link https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
   */
  const fetchEarthquakes = async (signal: AbortSignal): Promise<void> => {
    try {
      const url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson`;

      const response = await fetch(`${url}`, {
        signal,
      });

      const result = await response.json();

      // Type-Guarding
      const isResult = (
        result: EarthquakesFeed | Error
      ): result is EarthquakesFeed => {
        return (result as EarthquakesFeed).metadata.generated !== undefined;
      };

      if (isResult(result)) {
        setEarthquakes(result.features);
      }

      // Simulates a slower response for UX feedback
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error(error);
    }
  };

  // Get the data on initial render
  useEffect(() => {
    if (isLoading === false) {
      return;
    }

    const abortController = new AbortController();

    fetchEarthquakes(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [isLoading]);

  /**
   * The search input query handler
   * @param event the onChange event of the search input
   * @description takes care of trimming trailing spaces
   */
  const handleSearchQueryChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchQuery(event.target.value.trim());
  };

  /**
   * Memoized version the filtered array
   */
  const searchResults = useMemo(() => {
    if (!searchQuery) {
      return undefined;
    }

    const searchResults = earthquakes?.filter((eq) =>
      eq.properties.place?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return searchResults;
  }, [earthquakes, searchQuery]);

  return (
    <x.div py={{ xs: 4, sm: 8 }} data-testid="app">
      <>
        <x.div px={{ xs: 4, sm: 8 }}>
          <SearchInput
            searchQuery={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </x.div>

        {!searchResults && latestThree && (
          <LatestEventsCards
            isLoading={isLoading}
            earthquakes={latestThree}
            onRefresh={() => {
              setIsLoading(true);
            }}
          />
        )}

        {searchResults && (
          <SearchResultList
            isLoading={isLoading}
            searchResults={searchResults}
            searchQuery={searchQuery}
          />
        )}
      </>
    </x.div>
  );
};
