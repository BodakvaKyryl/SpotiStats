"use client";

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ErrorContainer, ProcessImage } from "@/components/elements/error-container";
import { ArtistCard } from "@/components/elements/artist";
import { Limit, TimeRange, SpotifyArtist } from "@/types";

export default function Artists() {
  const { data: session, status } = useSession();
  const [artists, setArtists] = useState<SpotifyArtist[]>([]);
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
    const fetchArtists = async () => {
      if (status === "authenticated" && session?.accessToken) {
        setLoading(true);
        try {
          const response = await fetch(
            "https://api.spotify.com/v1/me/top/artists?" +
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
          setArtists(data.items);
          setError(null);
        } catch (error) {
          console.error("Error fetching artists:", error);
          setError("Failed to load your artists. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchArtists();
  }, [session, status, timeRange, limit]);

  if (loading) return <ProcessImage />;
  if (error) return <ErrorContainer message={error} />;

  return (
    <div className="container mx-auto max-w-7xl py-16 px-4">
      <div className="flex flex-col space-y-16">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Top Artists</h1>

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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {artists.map((artist, index) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              position={index + 1}
              showGenres
              onClick={() => console.log(`Clicked artist: ${artist.name}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
