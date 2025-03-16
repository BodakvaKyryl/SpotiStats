import { SpotifyImage } from "./image.type";

export interface SpotifyAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
}
