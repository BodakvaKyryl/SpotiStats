"use client";

import { ErrorContainer, ProtectedLayout, SongItem, TimeRangeSelector } from "@/components";
import { useAuthSWR } from "@/hooks/useSpotifyData";
import { SpotifyService } from "@/services/spotify-service";
import { Limit, TimeRange } from "@/types";
import { Box, ListItem, ListItemAvatar, ListItemText, Paper, SelectChangeEvent, Skeleton } from "@mui/material";
import { useState } from "react";

export default function Songs() {
  const [timeRange, setTimeRange] = useState<TimeRange>("short_term");
  const [limit, setLimit] = useState<Limit>("20");

  const { data, error, isLoading } = useAuthSWR<typeof SpotifyService.getTopUserSongs>(SpotifyService.getTopUserSongs, {
    timeRange,
    limit,
  });

  const handleTimeRangeChange = (event: SelectChangeEvent) => {
    setTimeRange(event.target.value as TimeRange);
  };

  const handleLimitChange = (event: SelectChangeEvent) => {
    setLimit(event.target.value as Limit);
  };

  const renderSkeletonItems = () => {
    return Array(20)
      .fill(null)
      .map((_, index) => (
        <Box
          key={`skeleton-${index}`}
          sx={{
            "&:not(:last-child)": {
              borderBottom: 1,
              borderColor: "divider",
            },
          }}>
          <ListItem className="flex items-center space-x-4 p-4 pt-2 pb-2">
            {/*  */}
            <ListItemAvatar>
              <Skeleton variant="rectangular" width={56} height={56} className="rounded-md pt-2 pb-2" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton variant="text" width={180} height={24} />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Skeleton variant="text" width={40} height={20} />
                    <Skeleton variant="text" width={80} height={16} />
                  </div>
                </div>
              }
              secondary={<Skeleton variant="text" width={140} height={23} />}
            />
          </ListItem>
        </Box>
      ));
  };

  if (error) return <ErrorContainer message="Failed to load your top songs. Please try again later." />;

  return (
    <ProtectedLayout>
      <div className="container mx-auto max-w-5xl px-4 py-16">
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
            {isLoading
              ? renderSkeletonItems()
              : data?.items?.map((song, index) => (
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
    </ProtectedLayout>
  );
}
