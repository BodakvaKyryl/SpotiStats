"use client";

import { Paper, Typography, Box, LinearProgress } from "@mui/material";
import { useAuthSWR } from "@/hooks/useSpotifyData";
import { ProcessImage, SongItem } from "@/components";
import { formatDuration } from "@/utils/format";
import { useState, useEffect } from "react";
import { SpotifyService } from "@/services";

export const CurrentlyPlaying = () => {
  const {
    data = {},
    isLoading,
    error,
  } = useAuthSWR<typeof SpotifyService.getCurrentlyPlaying>(SpotifyService.getCurrentlyPlaying, undefined);

  const isValidPlayback = Boolean(data?.is_playing && data?.item?.id && typeof data?.progress_ms === "number");
  const isEmpty = !isValidPlayback || error?.status === 204 || error?.status === 404;

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (!isEmpty && data?.item) {
      setIsPlaying(true);
    } else {
      timeoutId = setTimeout(() => {
        setIsPlaying(false);
      }, 500);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isEmpty, data]);

  if (isLoading) return <ProcessImage />;

  return (
    <div className={`fade-in-out transition-opacity duration-500`}>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">{isPlaying ? "Now playing" : "Nothing is playing"}</h1>
      </div>

      <Paper
        elevation={0}
        variant="outlined"
        className={`fade-in-out bg-background overflow-hidden rounded-md transition-opacity duration-500`}>
        <Box
          className={`fade-in-out space-y-2 p-4 transition-opacity duration-500 ${isPlaying ? "opacity-100" : "opacity-0"}`}>
          {isPlaying && (
            <>
              <SongItem song={data.item} />
              <div className="px-4">
                <LinearProgress
                  variant="determinate"
                  value={Math.min(((data.progress_ms || 0) / (data.item.duration_ms || 1)) * 100, 100)}
                  sx={{ height: 4, borderRadius: 2 }}
                />
                <Box className="mt-1 flex justify-between">
                  <Typography variant="caption" color="text.secondary">
                    {formatDuration(data?.progress_ms || 0)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDuration(data?.item?.duration_ms || 0)}
                  </Typography>
                </Box>
              </div>
            </>
          )}
        </Box>
      </Paper>
    </div>
  );
};
