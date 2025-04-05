import { SpotifyImage } from "./image.type";

export interface SpotifyAlbum {
  id: string;
  name: string;
  uri?: string;
  images: SpotifyImage[];
  popularity?: number;
  artists: Array<{ name: string }>;
}

export interface AlbumItemProps {
  album: SpotifyAlbum;
  position?: number;
  onClick?: VoidFunction;
}
