export interface SpotifyListeningStats {
  timestamp: number;
  count: number;
  track: {
    id: string;
    name: string;
    artist: string;
  };
}
