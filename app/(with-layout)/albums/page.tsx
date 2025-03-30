"use client";

import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { AlbumItem, TimeRangeSelector, ErrorContainer, ProcessImage } from "@/components";
import { Limit, TimeRange } from "@/types";
import { useTopAlbums } from "@/hooks/useSpotifyData";

export default function Albums() {
  const [timeRange, setTimeRange] = useState<TimeRange>("short_term");
  const [limit, setLimit] = useState<Limit>("20");

  const { data: albums, error, isLoading } = useTopAlbums(timeRange, limit);

  const handleTimeRangeChange = (event: SelectChangeEvent) => {
    setTimeRange(event.target.value as TimeRange);
  };

  const handleLimitChange = (event: SelectChangeEvent) => {
    setLimit(event.target.value as Limit);
  };

  if (isLoading) return <ProcessImage />;
  if (error) return <ErrorContainer message="Failed to load your top albums. Please try again later." />;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-16">
      <div className="flex flex-col space-y-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Top Albums</h1>
          <TimeRangeSelector
            timeRange={timeRange}
            limit={limit}
            onTimeRangeChange={handleTimeRangeChange}
            onLimitChange={handleLimitChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {albums?.map((album, index) => <AlbumItem key={album.id} album={album} position={index + 1} />)}
        </div>
      </div>
    </div>
  );
}
