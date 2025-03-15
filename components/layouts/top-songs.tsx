"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Container, Typography, List, CircularProgress } from "@mui/material";
import { SongItem } from "../elements/song";

const TopSongs = () => {
  const { data: session, status } = useSession();
  const [topSongs, setTopSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSongs = async () => {
      if (status === "authenticated" && session?.accessToken) {
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
          const data = await response.json();
          setTopSongs(data.items);
        } catch (error) {
          console.error("Error fetching top songs:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTopSongs();
  }, [session, status]);

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Top Songs
      </Typography>
      <List>
        {topSongs.map((song) => (
          <SongItem
            key={song.id}
            id={song.id}
            name={song.name}
            artists={song.artists}
            albumImageUrl={song.album.images[0]?.url}
          />
        ))}
      </List>
    </Container>
  );
};

export default TopSongs;
