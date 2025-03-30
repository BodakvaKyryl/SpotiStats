"use client";

import { SelectChangeEvent } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ErrorContainer, ProcessImage } from "@/components/elements/error-container";
import { TimeRangeSelector } from "@/components/elements/shared/time-range-selector";
import { Limit, SpotifyArtist, TimeRange } from "@/types";
import { GenreCard } from "@/components/elements/genre";

interface GenreCount {
  name: string;
  count: number;
  artists: string[];
}

export default function Genres() {
  const { data: session, status } = useSession();
  const [genres, setGenres] = useState<GenreCount[]>([]);
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
    const fetchGenres = async () => {
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

          const genreMap = new Map<string, { count: number; artists: string[] }>();

          data.items.forEach((artist: SpotifyArtist) => {
            artist.genres.forEach((genre: string) => {
              const current = genreMap.get(genre) || { count: 0, artists: [] };
              genreMap.set(genre, {
                count: current.count + 1,
                artists: [...current.artists, artist.name].slice(0, 4),
              });
            });
          });

          const sortedGenres = Array.from(genreMap.entries())
            .map(([name, { count, artists }]) => ({
              name,
              count,
              artists,
            }))
            .sort((a, b) => b.count - a.count);

          setGenres(sortedGenres);
          setError(null);
        } catch (error) {
          console.error("Error fetching genres:", error);
          setError("Failed to load your favorite genres. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchGenres();
  }, [session, status, timeRange, limit]);

  if (loading) return <ProcessImage />;
  if (error) return <ErrorContainer message={error} />;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-16">
      <div className="flex flex-col space-y-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Top Genres</h1>
          <TimeRangeSelector
            timeRange={timeRange}
            limit={limit}
            onTimeRangeChange={handleTimeRangeChange}
            onLimitChange={handleLimitChange}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {genres.map((genre, index) => (
            <GenreCard key={genre.name} genre={genre} position={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
