import { Earthquake, x } from "framework";
import React, { FC } from "react";
import { RefreshIcon } from "@heroicons/react/outline";
import { EarthquakeCard } from "components/EarthquakeCard";

type LatestEventsCardsProps = {
  isLoading: boolean;
  earthquakes: Earthquake[];
  onRefresh: () => void;
};

export const LatestEventsCards: FC<LatestEventsCardsProps> = ({
  isLoading,
  earthquakes,
  onRefresh,
}) => {
  return (
    <x.div px={{ xs: 4, sm: 8 }} mt={3}>
      {isLoading ? (
        <x.h2
          fontSize="4xl"
          fontWeight="bold"
          textAlign="center"
          data-testid="latest-events--loading"
        >
          Loading...
        </x.h2>
      ) : (
        <x.div data-testid="latest-events">
          <x.h2 fontSize="4xl" fontWeight="bold" textAlign="center">
            3 latest events
          </x.h2>

          <x.button
            mt={1}
            textAlign="center"
            onClick={onRefresh}
            display="grid"
            gap={0.5}
            gridAutoFlow="column"
            alignItems="center"
            justifyContent="start"
            mx="auto"
            fontSize="sm"
            appearance="none"
            p={0.5}
            borderWidth={1}
            borderRadius={3}
            borderColor="true-gray-300"
            backgroundColor="transparent"
            data-testid="latest-events--refresh-button"
          >
            <RefreshIcon width={16} height={16} />
            Refresh data
          </x.button>

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
            {earthquakes?.map((earthquake) => {
              return (
                <EarthquakeCard
                  key={earthquake.id}
                  id={earthquake.id}
                  magnitude={earthquake.properties.mag}
                  place={earthquake.properties.place}
                  time={earthquake.properties.time}
                  url={earthquake.properties.url}
                />
              );
            })}
          </x.div>
        </x.div>
      )}
    </x.div>
  );
};
