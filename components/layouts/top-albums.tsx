"use client";

import { ErrorContainer, HorizontalScroll, SpotifyButton, TopAlbumItem } from "@/components";
import { useAuthSWR } from "@/hooks/useSpotifyData";
import { SpotifyService } from "@/services/spotify-service";
import { SpotifyAlbum } from "@/types";
import { Box, Skeleton, Paper } from "@mui/material";
import Link from "next/link";

export const TopAlbums = () => {
  const { data, error, isLoading } = useAuthSWR<typeof SpotifyService.getTopUserAlbums>(
    SpotifyService.getTopUserAlbums,
    {
      timeRange: "short_term",
      limit: "10",
    }
  );

  const renderSkeletonItems = () => {
    return Array(5)
      .fill(null)
      .map((_, index) => (
        <Box
          key={`skeleton-${index}`}
          sx={{
            minWidth: {
              xs: "160px",
              sm: "180px",
              md: "200px",
            },
            maxWidth: {
              xs: "160px",
              sm: "180px",
              md: "200px",
            },
            px: 1,
          }}>
          <Paper elevation={0} variant="outlined" className="h-full">
            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-t-md bg-neutral-100 dark:bg-neutral-800">
              <Skeleton variant="rectangular" width="100%" height="100%" />
            </div>
            <div className="flex flex-col items-center gap-2 p-4">
              <Skeleton variant="text" width="80%" height={24} />
              <Skeleton variant="text" width="60%" height={20} />
              <Skeleton variant="text" width="40%" height={16} />
            </div>
          </Paper>
        </Box>
      ));
  };

  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Top albums</h1>
          <Link href="/albums">
            <SpotifyButton>Show All</SpotifyButton>
          </Link>
        </div>
        <Box className="space-y-4">
          <HorizontalScroll>{renderSkeletonItems()}</HorizontalScroll>
        </Box>
      </>
    );
  }

  if (error) {
    return <ErrorContainer message="Failed to load your top albums. Please try again later." />;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Top albums</h1>
        <Link href="/albums">
          <SpotifyButton>Show All</SpotifyButton>
        </Link>
      </div>
      <Box className="space-y-4">
        <HorizontalScroll>
          {data?.items?.map((album: SpotifyAlbum) => (
            <Box
              key={album.id}
              sx={{
                minWidth: {
                  xs: "160px",
                  sm: "180px",
                  md: "200px",
                },
                maxWidth: {
                  xs: "160px",
                  sm: "180px",
                  md: "200px",
                },
                px: 1,
              }}>
              <TopAlbumItem album={album} />
            </Box>
          ))}
        </HorizontalScroll>
      </Box>
    </>
  );
};
