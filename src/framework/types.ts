export type Earthquake = {
  type: "Feature";
  properties: {
    mag: number;
    place: string;
    time: number;
    updated: number | null;
    tz: number | null;
    url: string | null;
    detail: string | null;
    felt: number | null;
    cdi: number | null;
    mmi: number | null;
    alert: string | null;
    status: string | null;
    tsunami: number | null;
    sig: number | null;
    net: string | null;
    code: string | null;
    ids: string | null;
    sources: string | null;
    types: string | null;
    nst: number | null;
    dmin: number | null;
    rms: number | null;
    gap: number | null;
    magType: string | null;
    type: string;
    title: string | null;
  };
  geometry: {
    type: "Point";
    coordinates: number[];
  };
  id: string;
};

export type EarthquakesFeed = {
  type: "FeatureCollection";
  metadata: {
    generated: number;
    url: string;
    title: string;
    status: number;
    api: string;
    count: number;
  };
  features: Earthquake[];
  bbox: number[];
};
