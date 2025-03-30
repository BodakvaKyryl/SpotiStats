"use client";

import { Paper, Typography, Box, LinearProgress } from "@mui/material";
import { useNowPlaying } from "@/hooks/useSpotifyData";
import { ProcessImage, SongItem } from "@/components";
import { formatDuration } from "@/utils/format";

export const CurrentlyPlaying = () => {
  const { data, isLoading, isEmpty } = useNowPlaying();

  if (isLoading) return <ProcessImage />;
  if (isEmpty) return null;

  const progressPercent = (data.progress_ms / data.item.duration_ms) * 100;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Now playing</h1>
      </div>
      <Paper elevation={0} variant="outlined" className="bg-background overflow-hidden rounded-md">
        <Box className="space-y-2 p-4">
          <SongItem song={data.item} />
          <div className="px-4">
            <LinearProgress variant="determinate" value={progressPercent} sx={{ height: 4, borderRadius: 2 }} />
            <Box className="mt-1 flex justify-between">
              <Typography variant="caption" color="text.secondary">
                {formatDuration(data.progress_ms)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDuration(data.item.duration_ms)}
              </Typography>
            </Box>
          </div>
        </Box>
      </Paper>
    </>
  );
};
