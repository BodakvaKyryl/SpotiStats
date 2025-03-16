"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Container, Typography, List } from "@mui/material";
import { SongItem } from "../elements/song";
import { SpotifySong } from "@/types/song.type";
import { ErrorContainer, ProcessImage } from "../elements/error-container";

const TopSongs = () => {
  const { data: session, status } = useSession();
  const [topSongs, setTopSongs] = useState<SpotifySong[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopSongs = async () => {
      if (status === "authenticated" && session?.accessToken) {
        if (session.error === "RefreshAccessTokenError") {
          setError("Your session has expired. Please sign in again.");
          signOut({ callbackUrl: "/login" });
          return;
        }

        try {
          const response = await fetch(
            "https://api.spotify.com/v1/me/top/tracks?" +
              new URLSearchParams({
                limit: "50",
                time_range: "long_term",
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
          setTopSongs(data.items);
          setError(null);
        } catch (error) {
          console.error("Error fetching top songs:", error);
          setError("Failed to load your top songs. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTopSongs();
  }, [session, status]);

  if (loading) {
    return <ProcessImage />;
  }

  if (error) {
    return <ErrorContainer message={error} />;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Top Songs
      </Typography>
      <List>
        {topSongs.map((song) => (
          <SongItem key={song.id} song={song} />
        ))}
      </List>
    </Container>
  );
};

export default TopSongs;
