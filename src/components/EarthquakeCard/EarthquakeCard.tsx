import { x } from "@xstyled/styled-components";
import { DateUtil } from "core";
import { Earthquake } from "framework";
import React, { FC } from "react";
import {
  LocationMarkerIcon,
  ClockIcon,
  ExternalLinkIcon,
} from "@heroicons/react/outline";

type EarthquakeCardProps = {
  id: Earthquake["id"];
  magnitude: Earthquake["properties"]["mag"];
  place: Earthquake["properties"]["place"];
  time: Earthquake["properties"]["time"];
  url: Earthquake["properties"]["url"];
};

export const EarthquakeCard: FC<EarthquakeCardProps> = ({
  id,
  magnitude,
  place,
  time,
  url,
}) => {
  return (
    <x.div
      data-testid={`earthquake-card-${id}`}
      w={{ xs: "100%", sm: "230px" }}
      borderRadius={3}
      borderWidth={1}
      borderColor="true-gray-300"
      transition={{ _: true, motionReduce: "none" }}
      transitionDuration={300}
      boxShadow={{ hover: "md" }}
    >
      <x.div p={3} backgroundColor="true-gray-200" textAlign="right">
        <x.h3 fontSize="5xl" fontWeight="bold">
          {magnitude.toFixed(2)}
        </x.h3>
      </x.div>

      <x.section
        p={1}
        display="grid"
        gap="1"
        gridAutoFlow="row"
        backgroundColor="white"
      >
        <x.div
          display="grid"
          gap={1}
          gridAutoFlow="column"
          alignItems="center"
          justifyContent="start"
        >
          <ClockIcon width={16} height={16} />
          {DateUtil.toRelative(new Date(time).toString())}
        </x.div>

        <x.div
          display="grid"
          gap={1}
          gridAutoFlow="column"
          alignItems="center"
          justifyContent="start"
        >
          <LocationMarkerIcon width={16} height={16} />
          {place}
        </x.div>

        <x.div
          display="grid"
          gap={1}
          gridAutoFlow="column"
          alignItems="center"
          justifyContent="start"
        >
          <ExternalLinkIcon width={16} height={16} />
          <x.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            More details
          </x.a>
        </x.div>
      </x.section>
    </x.div>
  );
};
