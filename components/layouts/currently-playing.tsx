"use client";

import { SongItem } from "@/components";
import { useNowPlaying } from "@/hooks/useNowPlaying";
import { formatDuration } from "@/utils/format";
import { Box, LinearProgress, Paper, Skeleton, Typography } from "@mui/material";

export const CurrentlyPlaying = () => {
  const { data, isLoading, isEmpty } = useNowPlaying();
  const isPlaying = Boolean(!isEmpty && data?.item);

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
          {isLoading || (!isPlaying && !isEmpty) ? (
            <div className="flex items-center space-x-4">
              <Skeleton variant="rectangular" width={56} height={56} className="rounded-md" />
              <div className="flex-1">
                <Skeleton variant="text" width="60%" height={24} />
                <Skeleton variant="text" width="40%" height={20} />
              </div>
            </div>
          ) : (
            <div className={`fade-in-out transition-opacity duration-500 ${isPlaying ? "opacity-100" : "opacity-0"}`}>
              {isPlaying && data?.item && (
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
                        {formatDuration(data.progress_ms || 0)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDuration(data.item.duration_ms || 0)}
                      </Typography>
                    </Box>
                  </div>
                </>
              )}
            </div>
          )}
          {!isLoading && isEmpty && (
            <div className="mb-1 flex items-center space-x-4">
              <div className="h-[56px] w-[56px] rounded-md bg-neutral-800" />
              <div className="flex-1">
                <Typography className="text-gray-400">Nothing is playing</Typography>
              </div>
            </div>
          )}
        </Box>
      </Paper>
    </div>
  );
};
