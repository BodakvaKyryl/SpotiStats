import { RecentlyPlayedSong, SpotifyArtist, SpotifySong } from ".";

export interface TopData {
  genres: { name: string; count: number; artists: string[] }[];
  songs: SpotifySong[];
  artists: SpotifyArtist[];
  recentSongs: RecentlyPlayedSong[];
}
