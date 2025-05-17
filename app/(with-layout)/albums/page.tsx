"use client";

import { AlbumItem, ErrorContainer, ProtectedLayout, TimeRangeSelector } from "@/components";
import { useAuthSWR } from "@/hooks/useSpotifyData";
import { SpotifyService } from "@/services";
import { Limit, SpotifyAlbum, TimeRange } from "@/types";
import { Box, Paper, SelectChangeEvent, Skeleton } from "@mui/material";
import { useState } from "react";

export default function Albums() {
  const [timeRange, setTimeRange] = useState<TimeRange>("short_term");
  const [limit, setLimit] = useState<Limit>("20");

  const { data, error, isLoading } = useAuthSWR<typeof SpotifyService.getTopUserAlbums>(
    SpotifyService.getTopUserAlbums,
    { timeRange, limit }
  );

  const handleTimeRangeChange = (event: SelectChangeEvent) => {
    setTimeRange(event.target.value as TimeRange);
  };

  const handleLimitChange = (event: SelectChangeEvent) => {
    setLimit(event.target.value as Limit);
  };

  const renderSkeletonItems = () => {
    return Array(8)
      .fill(null)
      .map((_, index) => (
        <Box key={`skeleton-${index}`}>
          <Paper elevation={0} variant="outlined" className="h-full">
            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-t-md bg-neutral-100 dark:bg-neutral-800">
              <Skeleton variant="rectangular" width="100%" height="100%" />
            </div>
            <div className="flex flex-col items-center gap-2 p-4">
              <Skeleton variant="text" width="70%" height={24} />
              <Skeleton variant="text" width="50%" height={20} />
              <Skeleton variant="text" width="40%" height={16} />
            </div>
          </Paper>
        </Box>
      ));
  };

  if (error) return <ErrorContainer message="Failed to load your top albums. Please try again later." />;

  return (
    <ProtectedLayout>
      <div className="container mx-auto max-w-7xl sm:px-1.25 md:px-4">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="text-3xl font-semibold">Top Albums</h1>
            <TimeRangeSelector
              timeRange={timeRange}
              limit={limit}
              onTimeRangeChange={handleTimeRangeChange}
              onLimitChange={handleLimitChange}
            />
          </div>

          <div className="grid-col-1 grid gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {isLoading
              ? renderSkeletonItems()
              : data?.items?.map((album: SpotifyAlbum, index: number) => (
                  <AlbumItem key={album.id} album={album} position={index + 1} />
                ))}
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
