import { SpotifySong } from ".";

export interface SpotifyPlaybackState {
  is_playing: boolean;
  item: SpotifySong | null;
  progress_ms: number | null;
  timestamp: number;
}

export interface RecentlyPlayedTrack {
  track: SpotifySong;
  played_at: string;
  context: {
    type: string;
    href: string;
    external_urls: {
      spotify: string;
    };
  } | null;
}

export interface RecentlyPlayedResponse {
  items: RecentlyPlayedTrack[];
  next: string | null;
  cursors: {
    after: string;
    before: string;
  };
  limit: number;
  href: string;
}
