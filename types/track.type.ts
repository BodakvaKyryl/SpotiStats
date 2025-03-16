import { SpotifyAlbum } from "./album.type";
import { SpotifyArtist } from "./artist.type";

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  uri: string;
}
