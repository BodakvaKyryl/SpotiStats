"use client";

import { Box, Paper, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { Limit, SpotifySong, TimeRange } from "@/types";
import { useTopSongs } from "@/hooks/useSpotifyData";
import { ProcessImage, ErrorContainer, TimeRangeSelector, SongItem } from "@/components";

export default function Songs() {
  const [timeRange, setTimeRange] = useState<TimeRange>("short_term");
  const [limit, setLimit] = useState<Limit>("20");

  const { data, error, isLoading } = useTopSongs(timeRange, limit);

  const handleTimeRangeChange = (event: SelectChangeEvent) => {
    setTimeRange(event.target.value as TimeRange);
  };

  const handleLimitChange = (event: SelectChangeEvent) => {
    setLimit(event.target.value as Limit);
  };

  if (isLoading) return <ProcessImage />;
  if (error) return <ErrorContainer message="Failed to load your top songs. Please try again later." />;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <div className="flex flex-col space-y-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Top Songs</h1>
          <TimeRangeSelector
            timeRange={timeRange}
            limit={limit}
            onTimeRangeChange={handleTimeRangeChange}
            onLimitChange={handleLimitChange}
          />
        </div>

        <Paper elevation={0} variant="outlined" className="bg-background overflow-hidden rounded-md">
          {data?.items?.map((song: SpotifySong, index: number) => (
            <Box
              key={song.id}
              sx={{
                "&:not(:last-child)": {
                  borderBottom: 1,
                  borderColor: "divider",
                },
              }}>
              <SongItem song={song} position={index + 1} />
            </Box>
          ))}
        </Paper>
      </div>
    </div>
  );
}
