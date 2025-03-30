"use client";

import { Paper, Typography, Box } from "@mui/material";
import { useRecentlyPlayed, useCurrentPlayback } from "@/hooks/useSpotifyData";
import { ProcessImage, ErrorContainer } from "@/components";
import { formatDistanceToNow } from "date-fns";

export const ListeningStats = () => {
  const { data: recentlyPlayed, error: recentError, isLoading: recentLoading } = useRecentlyPlayed("50");
  const { data: currentTrack, error: currentError, isLoading: currentLoading } = useCurrentPlayback();

  if (recentLoading || currentLoading) return <ProcessImage />;
  if (recentError || currentError) return <ErrorContainer message="Failed to load listening stats" />;

  const lastPlayed = recentlyPlayed?.items?.[0];
  const isPlaying = currentTrack?.is_playing;
  const nowPlaying = currentTrack?.item;

  return (
    <Paper elevation={0} variant="outlined" className="p-4">
      <Typography variant="h6" className="mb-4">
        Listening Stats
      </Typography>

      <Box className="space-y-4">
        {isPlaying && nowPlaying ? (
          <div>
            <Typography variant="body2" color="text.secondary">
              Now Playing
            </Typography>
            <Typography>
              {nowPlaying.name} - {nowPlaying.artists[0].name}
            </Typography>
          </div>
        ) : lastPlayed ? (
          <div>
            <Typography variant="body2" color="text.secondary">
              Last Played
            </Typography>
            <Typography>
              {lastPlayed.track.name} - {lastPlayed.track.artists[0].name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatDistanceToNow(new Date(lastPlayed.played_at), { addSuffix: true })}
            </Typography>
          </div>
        ) : (
          <Typography color="text.secondary">No recent listening activity</Typography>
        )}
      </Box>
    </Paper>
  );
};
