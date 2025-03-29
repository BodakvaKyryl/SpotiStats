"use client";

import { Box, Paper } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ErrorContainer, ProcessImage } from "@/components/elements/error-container";
import { SongItem } from "@/components/elements/song";
import { SpotifyRecentlyPlayed } from "@/types";
import ListeningStats from "@/components/elements/listening-stats";

export default function Home() {
  const { data: session, status } = useSession();
  const [recentTracks, setRecentTracks] = useState<SpotifyRecentlyPlayed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      if (status === "authenticated" && session?.accessToken) {
        setLoading(true);
        try {
          const response = await fetch(
            "https://api.spotify.com/v1/me/player/recently-played?" +
              new URLSearchParams({
                limit: "50",
              }).toString(),
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
          }

          const data = await response.json();
          setRecentTracks(data.items);
          setError(null);
        } catch (error) {
          console.error("Error fetching recently played:", error);
          setError("Failed to load your recently played tracks. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRecentlyPlayed();
  }, [session, status]);

  if (loading) return <ProcessImage />;
  if (error) return <ErrorContainer message={error} />;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <div className="flex flex-col space-y-16">
        {/* <div>
          <h1 className="mb-8 text-3xl font-semibold">Listening Stats</h1>
          <ListeningStats />
        </div> */}

        <div>
          <h1 className="mb-8 text-3xl font-semibold">Recently Played</h1>
          <Paper elevation={0} variant="outlined" className="bg-background overflow-hidden rounded-md">
            {recentTracks.map((item, index) => (
              <Box
                key={`${item.track.id}-${item.played_at}`}
                sx={{
                  "&:not(:last-child)": {
                    borderBottom: 1,
                    borderColor: "divider",
                  },
                }}>
                <SongItem song={item.track} position={index + 1} />
              </Box>
            ))}
          </Paper>
        </div>
      </div>
    </div>
  );
}
