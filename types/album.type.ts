import { SpotifyArtist } from "./artist.type";
import { SpotifyImage } from "./image.type";

export interface SpotifyAlbum {
  id: string;
  name: string;
  uri?: string;
  images: SpotifyImage[];
  popularity?: number;
  total_tracks: number;
  release_date: string;
  artists: Pick<SpotifyArtist, "id" | "name">[];
  external_urls: {
    spotify: string;
  };
}

export interface AlbumItemProps {
  album: SpotifyAlbum;
  position?: number;
  onClick?: VoidFunction;
}
