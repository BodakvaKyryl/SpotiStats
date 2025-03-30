import { SpotifyAlbum } from "./album.type";
import { SpotifyArtist } from "./artist.type";

export interface SpotifySong {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  uri: string;
  duration_ms: number;
  played_at?: string;
}

export interface SongItemProps {
  song: SpotifySong;
  playCount?: number;
  position?: number;
}

export interface SpotifyTrackResponse {
  items: Array<{
    album: SpotifyAlbum;
  }>;
}
