"use client";

import { ErrorContainer, HorizontalScroll, SpotifyButton, TopAlbumItem } from "@/components";
import { useAuthSWR } from "@/hooks/useSpotifyData";
import { SpotifyService } from "@/services/spotify-service";
import { SpotifyAlbum } from "@/types";
import { Box, Skeleton } from "@mui/material";
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
              xs: "140px",
              sm: "160px",
              md: "180px",
            },
            maxWidth: {
              xs: "140px",
              sm: "160px",
              md: "180px",
            },
            px: 1,
          }}>
          <div className="flex flex-col gap-2 p-2">
            <Skeleton variant="rectangular" width="100%" height={0} sx={{ paddingTop: "100%", borderRadius: 2 }} />
            <div className="flex flex-col">
              <Skeleton variant="text" width="80%" height={24} />
              <Skeleton variant="text" width="60%" height={20} />
            </div>
          </div>
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
                  xs: "140px",
                  sm: "160px",
                  md: "180px",
                },
                maxWidth: {
                  xs: "140px",
                  sm: "160px",
                  md: "180px",
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
