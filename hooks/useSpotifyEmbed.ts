"use client";

import { useState, useEffect } from "react";
import { SpotifyService } from "@/services";

export const useSpotifyEmbed = (url: string) => {
  const [embedHtml, setEmbedHtml] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEmbed = async () => {
      try {
        setIsLoading(true);
        const data = await SpotifyService.getOEmbed(url);
        setEmbedHtml(data.html);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch embed"));
      } finally {
        setIsLoading(false);
      }
    };

    if (url) {
      fetchEmbed();
    }
  }, [url]);

  return { embedHtml, isLoading, error };
};
