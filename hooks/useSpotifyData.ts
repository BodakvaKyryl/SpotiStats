"use client";

import useSWR, { SWRConfiguration } from "swr";
import useSWRImmutable from "swr/immutable";
import { useSession } from "next-auth/react";
import { TimeRange, Limit, SpotifySong, RecentlyPlayedResponse, SpotifyAlbum } from "@/types";
import { spotifyFetcher } from "@/utils/fetcher";
import { SpotifyService } from "@/services/spotify-service";
import { useMemo } from "react";

export function useTopSongs(timeRange: TimeRange, limit: Limit) {
  const { data: session } = useSession();

  return useSWRImmutable(
    session?.accessToken
      ? `https://api.spotify.com/v1/me/top/tracks?${new URLSearchParams({
          limit,
          time_range: timeRange,
          scope: "user-top-read",
        })}`
      : null,
    spotifyFetcher(session)
  );
}

export function useTopAlbums(timeRange: TimeRange, limit: Limit) {
  const { data: session } = useSession();

  const {
    data: tracksData,
    error: tracksError,
    isLoading: tracksLoading,
  } = useSWR<{ items: SpotifySong[] }>(
    session?.accessToken
      ? `https://api.spotify.com/v1/me/top/tracks?${new URLSearchParams({
          limit,
          time_range: timeRange,
        })}`
      : null,
    spotifyFetcher(session)
  );

  const albumIds = tracksData?.items
    ? Array.from(new Set(tracksData.items.map((track: SpotifySong) => track.album.id)))
    : [];

  const chunkedAlbumIds = albumIds.reduce<string[][]>((acc, id, i) => {
    const chunkIndex = Math.floor(i / 20);
    if (!acc[chunkIndex]) acc[chunkIndex] = [];
    acc[chunkIndex].push(id);
    return acc;
  }, []);

  const chunk0 = useSWRImmutable(
    chunkedAlbumIds[0]?.length > 0 && session?.accessToken
      ? `https://api.spotify.com/v1/albums?${new URLSearchParams({
          ids: chunkedAlbumIds[0].join(","),
        })}`
      : null,
    spotifyFetcher(session)
  );

  const chunk1 = useSWRImmutable(
    chunkedAlbumIds[1]?.length > 0 && session?.accessToken
      ? `https://api.spotify.com/v1/albums?${new URLSearchParams({
          ids: chunkedAlbumIds[1].join(","),
        })}`
      : null,
    spotifyFetcher(session)
  );

  const chunk2 = useSWRImmutable(
    chunkedAlbumIds[2]?.length > 0 && session?.accessToken
      ? `https://api.spotify.com/v1/albums?${new URLSearchParams({
          ids: chunkedAlbumIds[2].join(","),
        })}`
      : null,
    spotifyFetcher(session)
  );

  const albumRequests = [chunk0, chunk1, chunk2].filter(Boolean);
  const albumsError = albumRequests.find((req) => req.error)?.error;
  const albumsLoading = albumRequests.some((req) => req.isLoading);
  const albumsData = albumRequests.reduce<SpotifyAlbum[]>((acc, req) => {
    if (req.data?.albums) {
      return [...acc, ...req.data.albums];
    }
    return acc;
  }, []);

  return {
    data: albumsData,
    error: tracksError || albumsError,
    isLoading: tracksLoading || albumsLoading,
  };
}
export function useTopArtists(params: Parameters<typeof SpotifyService.getTopUserArtists>[1]) {
  const { data: session } = useSession();

  return useSWRImmutable(session?.accessToken ? ["top-artists", session.accessToken, params] : null, () =>
    SpotifyService.getTopUserArtists(session.accessToken, params)
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
    spotifyFetcher(session),
    { onError: (error) => console.error("Error fetching top albums:", error) }
  );
}

export function useNowPlaying() {
  const { data: session } = useSession();
  const POLLING_INTERVAL = 3000;

  const { data, error } = useSWR(
    session?.accessToken ? "https://api.spotify.com/v1/me/player/currently-playing" : null,
    spotifyFetcher(session),
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAuthSWR = <T extends (...args: any[]) => unknown, ParamT = Parameters<T>[1]>(
  fetcher: T,
  params: ParamT,
  options?: SWRConfiguration
) => {
  const { data: session } = useSession();

  const key = useMemo(() => {
    if (!session?.accessToken) return null;
    return [fetcher.name, session.accessToken, params];
  }, [session?.accessToken, fetcher.name, params]);

  return useSWR(key, () => fetcher(session?.accessToken, params) as Awaited<ReturnType<T>>, {
    revalidateOnFocus: false,
    ...options,
  });
};
