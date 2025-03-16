"use client";

import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SpotifySong } from "@/types/song.type";
import { ErrorContainer, ProcessImage } from "@/components/elements/error-container";
import { SongItem } from "@/components/elements/song";
import { Limit, TimeRange } from "@/types/_index";

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
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4" component="h1">
            Top Tracks
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl size="small">
              <InputLabel>Time Range</InputLabel>
              <Select value={timeRange} label="Time Range" onChange={handleTimeRangeChange} sx={{ minWidth: 150 }}>
                <MenuItem value="short_term">Last 4 Weeks</MenuItem>
                <MenuItem value="medium_term">Last 6 Months</MenuItem>
                <MenuItem value="long_term">All Time</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small">
              <InputLabel>Limit</InputLabel>
              <Select value={limit} label="Limit" onChange={handleLimitChange} sx={{ minWidth: 100 }}>
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="20">20</MenuItem>
                <MenuItem value="50">50</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Paper
          elevation={0}
          variant="outlined"
          sx={{
            borderRadius: 1,
            overflow: "hidden",
            bgcolor: "background.paper",
          }}>
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
      </Box>
    </Container>
  );
}
