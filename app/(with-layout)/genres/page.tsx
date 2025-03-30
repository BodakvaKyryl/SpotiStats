"use client";

import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { Limit, SpotifyArtist, TimeRange } from "@/types";
import { useTopArtists } from "@/hooks/useSpotifyData";
import { ProcessImage, ErrorContainer, TimeRangeSelector, GenreCard } from "@/components";

export default function Genres() {
  const [timeRange, setTimeRange] = useState<TimeRange>("short_term");
  const [limit, setLimit] = useState<Limit>("20");

  const { data: artistsData, error, isLoading } = useTopArtists(timeRange, limit);

  const handleTimeRangeChange = (event: SelectChangeEvent) => {
    setTimeRange(event.target.value as TimeRange);
  };

  const handleLimitChange = (event: SelectChangeEvent) => {
    setLimit(event.target.value as Limit);
  };

  if (isLoading) return <ProcessImage />;
  if (error) return <ErrorContainer message="Failed to load your top genres. Please try again later." />;

  const genreMap = new Map<string, { count: number; artists: string[] }>();
  artistsData?.items?.forEach((artist: SpotifyArtist) => {
    artist.genres.forEach((genre: string) => {
      const current = genreMap.get(genre) || { count: 0, artists: [] };
      genreMap.set(genre, {
        count: current.count + 1,
        artists: [...current.artists, artist.name].slice(0, 3),
      });
    });
  });

  const genres = Array.from(genreMap.entries())
    .map(([name, { count, artists }]) => ({ name, count, artists }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-16">
      <div className="flex flex-col space-y-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Top Genres</h1>
          <TimeRangeSelector
            timeRange={timeRange}
            limit={limit}
            onTimeRangeChange={handleTimeRangeChange}
            onLimitChange={handleLimitChange}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {genres.map((genre, index) => (
            <GenreCard key={genre.name} genre={genre} position={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
