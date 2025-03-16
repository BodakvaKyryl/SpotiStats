"use client";

import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SpotifyAlbum } from "@/types/album.type";
import { ErrorContainer, ProcessImage } from "@/components/elements/error-container";
import { AlbumItem } from "@/components";
import { Limit, SpotifyTrackResponse, TimeRange } from "@/types/_index";

export default function Albums() {
  const { data: session, status } = useSession();
  const [albums, setAlbums] = useState<SpotifyAlbum[]>([]);
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
    const fetchAlbums = async () => {
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

          const data = (await response.json()) as SpotifyTrackResponse;
          const uniqueAlbums = Array.from(
            new Map(data.items.map((track) => [track.album.id, track.album])).values()
          ) as SpotifyAlbum[];

          setAlbums(uniqueAlbums);
          setError(null);
        } catch (error) {
          console.error("Error fetching albums:", error);
          setError("Failed to load your albums. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAlbums();
  }, [session, status, timeRange, limit]);

  if (loading) {
    return <ProcessImage />;
  }

  if (error) {
    return <ErrorContainer message={error} />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4" component="h1">
            Top Albums
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

        <Grid container spacing={3}>
          {albums.map((album, index) => (
            <Grid item key={album.id} xs={12} sm={6} md={4} lg={3}>
              <AlbumItem album={album} position={index + 1} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
