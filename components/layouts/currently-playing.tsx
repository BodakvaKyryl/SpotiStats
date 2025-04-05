"use client";

import { Paper, Typography, Box, LinearProgress } from "@mui/material";
import { useAuthSWR } from "@/hooks/useSpotifyData";
import { ProcessImage, SongItem } from "@/components";
import { formatDuration } from "@/utils/format";
import { SpotifyService } from "@/services";

export const CurrentlyPlaying = () => {
  const {
    data = {},
    isLoading,
    error,
  } = useAuthSWR<typeof SpotifyService.getCurrentlyPlaying>(SpotifyService.getCurrentlyPlaying, undefined, {
    revalidateOnFocus: true,
    refreshInterval: 1000,
    revalidateOnReconnect: true,
    refreshWhenHidden: false,
  });

  const isValidPlayback = Boolean(data?.is_playing && data?.item?.id && typeof data?.progress_ms === "number");
  const isEmpty = !isValidPlayback || error?.status === 204 || error?.status === 404;

  const isPlaying = Boolean(!isEmpty && data?.item);

  if (isLoading) return <ProcessImage />;

  return (
    <div className={`fade-in-out transition-opacity duration-500`}>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Now playing</h1>
      </div>

      <Paper
        elevation={0}
        variant="outlined"
        className={`fade-in-out bg-background overflow-hidden rounded-md transition-opacity duration-500`}>
        <Box className="space-y-2 p-4">
          <div className={`fade-in-out transition-opacity duration-500 ${isPlaying ? "opacity-100" : "opacity-0"}`}>
            {isPlaying && (
              <>
                <SongItem song={data.item} />
                <div className="mx-4">
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
          </div>
          {!isPlaying && <p className="text-white">{isEmpty ? "Nothing is playing" : "Loading..."}</p>}
        </Box>
      </Paper>
    </div>
  );
};
