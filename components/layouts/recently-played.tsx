"use client";

import { ErrorContainer, RecentlyPlayedItem } from "@/components";
import { useAuthSWR } from "@/hooks/useSpotifyData";
import { SpotifyService } from "@/services";
import { Box, Paper, Skeleton } from "@mui/material";

export const RecentlyPlayed = () => {
  const { data, error, isLoading } = useAuthSWR(SpotifyService.getRecentlyPlayed, { limit: "50" });

  const renderSkeletonItems = () => {
    return Array(5)
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
          <div className="flex items-center space-x-4 p-4">
            <Skeleton variant="rectangular" width={56} height={56} className="rounded-md" />
            <div className="flex-1">
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="text" width="40%" height={20} />
            </div>
            <Skeleton variant="text" width={60} />
          </div>
        </Box>
      ));
  };

  if (isLoading) {
    return (
      <>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Recently played</h1>
        </div>
        <Paper elevation={0} variant="outlined" className="bg-background overflow-hidden rounded-md">
          {renderSkeletonItems()}
        </Paper>
      </>
    );
  }

  if (error) return <ErrorContainer message="Failed to load recently played tracks" />;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Recently played</h1>
      </div>
      <Paper elevation={0} variant="outlined" className="bg-background overflow-hidden rounded-md">
        <div>
          {data?.items?.map((item) => (
            <Box
              key={`${item.track.id}-${item.played_at}`}
              sx={{
                "&:not(:last-child)": {
                  borderBottom: 1,
                  borderColor: "divider",
                },
              }}>
              <RecentlyPlayedItem track={item} />
            </Box>
          ))}
        </div>
      </Paper>
    </>
  );
};
