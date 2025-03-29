"use client";

import { SelectChangeEvent } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ErrorContainer, ProcessImage } from "@/components/elements/error-container";
import { ArtistCard } from "@/components/elements/artist";
import { TimeRangeSelector } from "@/components/elements/shared/time-range-selector";
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
    <div className="container mx-auto max-w-7xl px-4 py-16">
      <div className="flex flex-col space-y-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Top Artists</h1>
          <TimeRangeSelector
            timeRange={timeRange}
            limit={limit}
            onTimeRangeChange={handleTimeRangeChange}
            onLimitChange={handleLimitChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
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
