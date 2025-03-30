"use client";

import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { TimeRangeSelector } from "@/components/elements/shared/time-range-selector";
import { Limit, SpotifyArtist, TimeRange } from "@/types";
import { useTopArtists } from "@/hooks/useSpotifyData";
import { ArtistCard, ErrorContainer, ProcessImage } from "@/components";

export default function Artists() {
  const [timeRange, setTimeRange] = useState<TimeRange>("short_term");
  const [limit, setLimit] = useState<Limit>("20");

  const { data, error, isLoading } = useTopArtists(timeRange, limit);

  const handleTimeRangeChange = (event: SelectChangeEvent) => {
    setTimeRange(event.target.value as TimeRange);
  };

  const handleLimitChange = (event: SelectChangeEvent) => {
    setLimit(event.target.value as Limit);
  };

  if (isLoading) return <ProcessImage />;
  if (error) return <ErrorContainer message="Failed to load your top artists. Please try again later." />;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-16">
      <div className="flex flex-col space-y-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Top Artists</h1>
          <TimeRangeSelector
            timeRange={timeRange}
            limit={limit}
            onTimeRangeChange={handleTimeRangeChange}
            onLimitChange={handleLimitChange}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.items?.map((artist: SpotifyArtist, index: number) => (
            <ArtistCard key={artist.id} artist={artist} position={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
