import { SpotifySong } from ".";

export interface SpotifyRecentlyPlayed {
  track: SpotifySong;
  played_at: string;
  context: {
    type: string;
    href: string;
    external_urls: {
      spotify: string;
    };
    uri: string;
  } | null;
}
