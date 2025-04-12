import { Limit, RecentlyPlayedResponse, SpotifyAlbum, SpotifyArtist, SpotifySong, TimeRange } from "@/types";

const buildUrl = (path: string, params: URLSearchParams) => {
  return new URL(`/v1${path}?${params}`, "https://api.spotify.com").toString();
};

const fetchData = async <T>(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params, accessToken }: { params?: Record<string, any>; accessToken?: string }
): Promise<T> => {
  const { timeRange, ...restParams } = params || {};
  const timeRangeParam = timeRange ? { time_range: timeRange } : {};
  const allParams = { ...restParams, ...timeRangeParam };

  const urlWithParams = buildUrl(url, new URLSearchParams(allParams));
  const response = await fetch(urlWithParams, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }

  return response.json();
};

export const SpotifyService = {
  getTopUserSongs: async (accessToken: string, params: { timeRange: TimeRange; limit: Limit }) => {
    const url = "/me/top/tracks";
    return fetchData<{ items: SpotifySong[] }>(url, {
      accessToken,
      params: { ...params, scope: "user-top-read" },
    });
  },

  getTopUserAlbums: async (accessToken: string, params: { timeRange: TimeRange; limit: Limit }) => {
    const tracksResponse = await SpotifyService.getTopUserSongs(accessToken, params);

    const albumIds = Array.from(new Set(tracksResponse.items.map((track) => track.album.id)));

    const chunkedAlbumIds = albumIds.reduce<string[][]>((acc, id, i) => {
      const chunkIndex = Math.floor(i / 20);
      if (!acc[chunkIndex]) acc[chunkIndex] = [];
      acc[chunkIndex].push(id);
      return acc;
    }, []);

    const albumChunks = await Promise.all(
      chunkedAlbumIds.map((chunk) => SpotifyService.getAlbums(accessToken, { ids: chunk }))
    );

    const albums = albumChunks.flatMap((chunk) => chunk.albums);

    return { items: albums };
  },

  getAlbums: async (accessToken: string, params: { ids: string[] }) => {
    const url = "/albums";
    return fetchData<{ albums: SpotifyAlbum[] }>(url, {
      accessToken,
      params: { ids: params.ids.join(",") },
    });
  },

  getTopUserArtists: async (accessToken: string, params: { timeRange: TimeRange; limit: Limit }) => {
    const url = "/me/top/artists";
    return fetchData<{ items: SpotifyArtist[] }>(url, { accessToken, params });
  },

  getRecentlyPlayed: async (accessToken: string, params: { limit: Limit }) => {
    const url = "/me/player/recently-played";
    return fetchData<RecentlyPlayedResponse>(url, { accessToken, params });
  },

  getUserPlaylists: async (accessToken: string, params: { limit: Limit }) => {
    const url = "/me/playlists";
    return fetchData(url, { accessToken, params });
  },

  getUserProfile: async (accessToken: string) => {
    const url = "/me";
    return fetchData(url, { accessToken });
  },

  getCurrentlyPlaying: async (accessToken: string) => {
    const url = "/me/player/currently-playing";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return fetchData<Record<string, any>>(url, { accessToken });
  },

  getPlaylistTracks: async (accessToken: string, params: { playlistId: string; limit: Limit }) => {
    const { playlistId, ...restParams } = params;
    const url = `/playlists/${playlistId}/tracks`;
    return fetchData(url, { accessToken, params: restParams });
  },

  getPlaylist: async (accessToken: string, params: { playlistId: string }) => {
    const { playlistId } = params;
    const url = `/playlists/${playlistId}`;
    return fetchData(url, { accessToken });
  },

  getAlbum: async (accessToken: string, params: { albumId: string }) => {
    const { albumId } = params;
    const url = `/albums/${albumId}`;
    return fetchData(url, { accessToken });
  },

  getTrack: async (accessToken: string, params: { trackId: string }) => {
    const { trackId } = params;
    const url = `/tracks/${trackId}`;
    return fetchData(url, { accessToken });
  },

  getArtist: async (accessToken: string, params: { artistId: string }) => {
    const { artistId } = params;
    const url = `/artists/${artistId}`;
    return fetchData(url, { accessToken });
  },

  getArtistTopTracks: async (accessToken: string, params: { artistId: string; market: string }) => {
    const { artistId, ...restParams } = params;
    const url = `/artists/${artistId}/top-tracks`;
    return fetchData(url, { accessToken, params: restParams });
  },

  getArtistAlbums: async (accessToken: string, params: { artistId: string; limit: Limit }) => {
    const { artistId, ...restParams } = params;
    const url = `/artists/${artistId}/albums`;
    return fetchData(url, { accessToken, params: restParams });
  },

  getArtistRelatedArtists: async (accessToken: string, params: { artistId: string }) => {
    const { artistId } = params;
    const url = `/artists/${artistId}/related-artists`;
    return fetchData(url, { accessToken });
  },

  getSearchResults: async (accessToken: string, params: { query: string; type: string; limit: Limit }) => {
    const url = "/search";
    return fetchData(url, { accessToken, params });
  },

  getAudioFeatures: async (accessToken: string, params: { trackId: string }) => {
    const { trackId } = params;
    const url = `/audio-features/${trackId}`;
    return fetchData(url, { accessToken });
  },

  getAudioAnalysis: async (accessToken: string, params: { trackId: string }) => {
    const { trackId } = params;
    const url = `/audio-analysis/${trackId}`;
    return fetchData(url, { accessToken });
  },
};
