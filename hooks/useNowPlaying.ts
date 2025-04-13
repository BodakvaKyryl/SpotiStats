"use client";

import { SpotifyService } from "@/services";
import { SpotifyPlaybackState } from "@/types";
import { useSession } from "next-auth/react";
import useSWR from "swr";

export function useNowPlaying() {
  const { data: session } = useSession();
  const POLLING_INTERVAL = 5000;

  const { data, error } = useSWR<SpotifyPlaybackState | null>(
    session?.accessToken ? "getCurrentlyPlaying" : null,
    async () => {
      if (!session?.accessToken) return null;
      return SpotifyService.getCurrentlyPlaying(session.accessToken);
    },
    {
      refreshInterval: POLLING_INTERVAL,
      revalidateOnFocus: true,
      shouldRetryOnError: false,
      errorRetryCount: 2,
      keepPreviousData: false,
    }
  );

  const isValidPlayback = Boolean(data?.is_playing && data?.item?.id && typeof data?.progress_ms === "number");
  const isEmpty = !isValidPlayback || error?.status === 204 || error?.status === 404;

  return {
    data,
    isLoading: !error && !data,
    isError: error && error.status !== 204 && error.status !== 404,
    isEmpty,
  };
}
