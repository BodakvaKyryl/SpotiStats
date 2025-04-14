"use client";

import { SpotifyService } from "@/services";
import { useMemo, useState } from "react";
import useSWR from "swr";

export const useSpotifyEmbed = (url: string, isOpen?: boolean) => {
  const [isFirstFetch, setIsFirstFetch] = useState(true);

  const shouldFetch = useMemo(() => {
    if (!isFirstFetch) {
      return true;
    }
    return isOpen;
  }, [isFirstFetch, isOpen]);

  console.log("shouldFetch", shouldFetch, isFirstFetch);

  const { data: { html: embedHtml } = { html: "" }, ...rest } = useSWR(
    shouldFetch ? url : null,
    (songUrl: string) => {
      console.log("fetching embedHtml", songUrl);

      return SpotifyService.getOEmbed(songUrl);
    },
    {
      revalidateOnFocus: false,
      onSuccess: () => setIsFirstFetch(false),
      onError: (error) => {
        console.error("Error fetching Spotify embed:", error);
      },
    }
  );

  return { embedHtml, ...rest };
};
