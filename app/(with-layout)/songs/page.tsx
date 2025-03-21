"use client";

import { Box, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ErrorContainer, ProcessImage } from "@/components/elements/error-container";
import { SongItem } from "@/components/elements/song";
import { Limit, TimeRange, SpotifySong } from "@/types";

export default function Songs() {
  const { data: session, status } = useSession();
  const [songs, setSongs] = useState<SpotifySong[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>("short_term");
  const [limit, setLimit] = useState<Limit>("20");

  const handleTimeRangeChange = (event: SelectChangeEvent) => {
    setTimeRange(event.target.value as TimeRange);
  };

  const handleLimitChange = (event: SelectChangeEvent) => {
    setLimit(event.target.value as Limit);
  };

  useEffect(() => {
    const fetchSongs = async () => {
      if (status === "authenticated" && session?.accessToken) {
        setLoading(true);
        try {
          const response = await fetch(
            "https://api.spotify.com/v1/me/top/tracks?" +
              new URLSearchParams({
                limit: limit,
                time_range: timeRange,
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
          setSongs(data.items);
          setError(null);
        } catch (error) {
          console.error("Error fetching songs:", error);
          setError("Failed to load your songs. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSongs();
  }, [session, status, timeRange, limit]);

  if (loading) {
    return <ProcessImage />;
  }

  if (error) {
    return <ErrorContainer message={error} />;
  }

  return (
    <div className="container mx-auto max-w-3xl py-16 px-4">
      <div className="flex flex-col space-y-16">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Top Tracks</h1>

          <div className="flex gap-4">
            <FormControl size="small">
              <InputLabel>Time Range</InputLabel>
              <Select value={timeRange} label="Time Range" onChange={handleTimeRangeChange} className="min-w-[150px]">
                <MenuItem value="short_term">Last 4 Weeks</MenuItem>
                <MenuItem value="medium_term">Last 6 Months</MenuItem>
                <MenuItem value="long_term">All Time</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small">
              <InputLabel>Limit</InputLabel>
              <Select value={limit} label="Limit" onChange={handleLimitChange} className="min-w-[100px]">
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="20">20</MenuItem>
                <MenuItem value="50">50</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <Paper elevation={0} variant="outlined" className="overflow-hidden rounded-md bg-background">
          {songs.map((song, index) => (
            <Box
              key={song.id}
              sx={{
                "&:not(:last-child)": {
                  borderBottom: 1,
                  borderColor: "divider",
                },
              }}>
              <SongItem song={song} position={index + 1} />
            </Box>
          ))}
        </Paper>
      </div>
    </div>
  );
}
