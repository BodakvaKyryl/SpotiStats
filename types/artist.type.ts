import { SpotifyImage } from "./image.type";

export interface SpotifyArtist {
  id: string;
  name: string;
  uri?: string;
  genres: string[];
  images: SpotifyImage[];
  popularity?: number;
}

export interface ArtistItemProps {
  artist: SpotifyArtist;
  position?: number;
  showGenres?: boolean;
  onClick?: VoidFunction;
}
