"use client";

import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { useSession } from "next-auth/react";
import { TimeRange, Limit, SpotifyAlbum, SpotifySong, RecentlyPlayedResponse } from "@/types";
import { spotifyFetcher } from "@/utils/fetcher";

export function useTopSongs(timeRange: TimeRange, limit: Limit) {
  const { data: session } = useSession();

  return useSWRImmutable(
    session?.accessToken
      ? `https://api.spotify.com/v1/me/top/tracks?${new URLSearchParams({
          limit,
          time_range: timeRange,
        })}`
      : null,
    spotifyFetcher(session)
  );
}

export function useTopAlbums(timeRange: TimeRange, limit: Limit) {
  const { data: session } = useSession();
  const {
    data: tracksData,
    error,
    isLoading,
  } = useSWR<{ items: SpotifySong[] }>(
    session?.accessToken
      ? `https://api.spotify.com/v1/me/top/tracks?${new URLSearchParams({
          limit,
          time_range: timeRange,
        })}`
      : null,
    spotifyFetcher(session)
  );

  const albums: SpotifyAlbum[] = tracksData?.items
    ? Array.from(new Map(tracksData.items.map((track) => [track.album.id, track.album])).values())
    : [];

  return {
    data: albums,
    error,
    isLoading,
  };
}

export function useTopArtists(timeRange: TimeRange, limit: Limit) {
  const { data: session } = useSession();

  return useSWRImmutable(
    session?.accessToken
      ? `https://api.spotify.com/v1/me/top/artists?${new URLSearchParams({
          limit,
          time_range: timeRange,
        })}`
      : null,
    spotifyFetcher(session)
  );
}

export function useRecentlyPlayed(limit: Limit = "50") {
  const { data: session } = useSession();

  return useSWRImmutable<RecentlyPlayedResponse>(
    session?.accessToken
      ? `https://api.spotify.com/v1/me/player/recently-played?${new URLSearchParams({
          limit,
        })}`
      : null,
    spotifyFetcher(session)
  );
}

export function useNowPlaying() {
  const { data: session } = useSession();

  const { data, error } = useSWR(
    session?.accessToken ? "https://api.spotify.com/v1/me/player/currently-playing" : null,
    spotifyFetcher(session),
    {
      refreshInterval: 1000,
      revalidateOnFocus: true,
      shouldRetryOnError: false,
      errorRetryCount: 2,
    }
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    isEmpty: error?.status === 404 || !data,
  };
}
