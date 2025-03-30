"use client";

import { Container, Typography, List } from "@mui/material";
import { ErrorContainer, ProcessImage, SongItem } from "@/components";
import { useTopSongs } from "@/hooks/useSpotifyData";
import { SpotifySong } from "@/types";

const TopSongs = () => {
  const { data, error, isLoading } = useTopSongs("long_term", "50");

  if (isLoading) {
    return <ProcessImage />;
  }

  if (error) {
    return <ErrorContainer message="Failed to load your top songs. Please try again later." />;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Top Songs
      </Typography>
      <List>{data?.items?.map((song: SpotifySong) => <SongItem key={song.id} song={song} />)}</List>
    </Container>
  );
};

export default TopSongs;
