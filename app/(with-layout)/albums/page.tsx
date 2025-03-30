"use client";

import { SelectChangeEvent } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SpotifyAlbum } from "@/types/album.type";
import { ErrorContainer, ProcessImage } from "@/components/elements/error-container";
import { AlbumItem } from "@/components";
import { Limit, SpotifyTrackResponse, TimeRange } from "@/types";
import { TimeRangeSelector } from "@/components/elements/shared/time-range-selector";

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
    <div className="container mx-auto max-w-7xl px-4 py-16">
      <div className="flex flex-col space-y-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Top Albums</h1>
          <TimeRangeSelector
            timeRange={timeRange}
            limit={limit}
            onTimeRangeChange={handleTimeRangeChange}
            onLimitChange={handleLimitChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {albums.map((album, index) => (
            <AlbumItem key={album.id} album={album} position={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
