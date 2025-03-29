"use client";

import { Paper, SelectChangeEvent } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ErrorContainer, ProcessImage } from "@/components/elements/error-container";
import { TimeRangeSelector } from "@/components/elements/shared/time-range-selector";
import { Limit, TimeRange, SpotifyListeningStats } from "@/types";

export default function ListeningStats() {
  const { data: session } = useSession();
  const [timeRange, setTimeRange] = useState<TimeRange>("short_term");
  const [limit, setLimit] = useState<Limit>("20");
  const [data, setData] = useState<SpotifyListeningStats[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.accessToken) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/stats/listening?time_range=${timeRange}&limit=${limit}`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.details || data.error || "Failed to fetch data");
        }

        setData(data);
        setError("");
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error instanceof Error ? error.message : "Failed to load listening stats");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session?.accessToken, timeRange, limit]);

  const handleTimeRangeChange = (event: SelectChangeEvent) => {
    setTimeRange(event.target.value as TimeRange);
  };

  const handleLimitChange = (event: SelectChangeEvent) => {
    setLimit(event.target.value as Limit);
  };

  if (loading) return <ProcessImage />;
  if (error) return <ErrorContainer message={error} />;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-16">
      <div className="flex flex-col space-y-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Listening Stats</h1>
          <TimeRangeSelector
            timeRange={timeRange}
            limit={limit}
            onTimeRangeChange={handleTimeRangeChange}
            onLimitChange={handleLimitChange}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <Paper key={item.track.id} className="p-4">
              <div className="flex flex-col space-y-2">
                <h3 className="font-medium">{item.track.name}</h3>
                <p className="text-sm text-gray-600">{item.track.artist}</p>
                <p className="text-lg font-semibold">Popularity score: {item.count}</p>
              </div>
            </Paper>
          ))}
        </div>
      </div>
    </div>
  );
}
