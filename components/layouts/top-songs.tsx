"use client";

import { ErrorContainer, HorizontalScroll, ProcessImage, SpotifyButton, TopSongItem } from "@/components";
import { useAuthSWR } from "@/hooks/useSpotifyData";
import { SpotifyService } from "@/services/spotify-service";
import { SpotifySong } from "@/types";
import { Box } from "@mui/material";
import Link from "next/link";

export const TopSongs = () => {
  const { data, error, isLoading } = useAuthSWR<typeof SpotifyService.getTopUserSongs>(SpotifyService.getTopUserSongs, {
    timeRange: "short_term",
    limit: "10",
  });

  if (isLoading) {
    return <ProcessImage />;
  }

  if (error) {
    return <ErrorContainer message="Failed to load your top songs. Please try again later." />;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Top songs</h1>
        <Link href="/songs">
          <SpotifyButton>Show All</SpotifyButton>
        </Link>
      </div>
      <Box className="space-y-4">
        <HorizontalScroll>
          {data?.items?.map((song: SpotifySong) => (
            <Box
              key={song.id}
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
              <TopSongItem song={song} />
            </Box>
          ))}
        </HorizontalScroll>
      </Box>
    </>
  );
};
