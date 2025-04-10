"use client";

import { Box } from "@mui/material";
import Link from "next/link";
import { useAuthSWR } from "@/hooks/useSpotifyData";
import { SpotifyArtist } from "@/types";
import { ErrorContainer, ProcessImage, TopArtistItem, SpotifyButton, HorizontalScroll } from "@/components";
import { SpotifyService } from "@/services/spotify-service";

export const TopArtists = () => {
  const { data, error, isLoading } = useAuthSWR<typeof SpotifyService.getTopUserArtists>(
    SpotifyService.getTopUserArtists,
    {
      timeRange: "short_term",
      limit: "10",
    }
  );

  if (isLoading) {
    return <ProcessImage />;
  }

  if (error) {
    return <ErrorContainer message="Failed to load your top artists. Please try again later." />;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Top artists</h1>
        <Link href="/artists">
          <SpotifyButton>Show All</SpotifyButton>
        </Link>
      </div>
      <Box className="space-y-4">
        <HorizontalScroll>
          {data?.items?.map((artist: SpotifyArtist) => (
            <Box
              key={artist.id}
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
              <TopArtistItem artist={artist} />
            </Box>
          ))}
        </HorizontalScroll>
      </Box>
    </>
  );
};
