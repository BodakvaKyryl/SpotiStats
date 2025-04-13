"use client";

import { ErrorContainer, HorizontalScroll, ProcessImage, SpotifyButton, TopAlbumItem } from "@/components";
import { useAuthSWR } from "@/hooks/useSpotifyData";
import { SpotifyService } from "@/services/spotify-service";
import { SpotifyAlbum } from "@/types";
import { Box } from "@mui/material";
import Link from "next/link";

export const TopAlbums = () => {
  const { data, error, isLoading } = useAuthSWR<typeof SpotifyService.getTopUserAlbums>(
    SpotifyService.getTopUserAlbums,
    {
      timeRange: "short_term",
      limit: "10",
    }
  );

  if (isLoading) {
    return <ProcessImage />;
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
