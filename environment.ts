export const environment = {
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID || "",
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET || "",
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || "",

  redirectUrl: "http://localhost:3000/home",
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
  scope: [
    "user-read-email", // Read access to user's email
    "user-read-private", // Read access to user's subscription, country, etc.
    "user-top-read", // Read access to user's top artists and tracks
    "user-read-recently-played", // Read access to user's recently played tracks
    "user-read-playback-state", // Read access to user's player state
    "user-modify-playback-state", // Control playback on user's devices
    "user-read-currently-playing", // Read currently playing track
    "playlist-read-private", // Read access to user's private playlists
    "playlist-read-collaborative", // Read access to collaborative playlists
    "playlist-modify-private", // Manage user's private playlists
    "playlist-modify-public", // Manage user's public playlists
    "user-library-read", // Read access to user's saved tracks and albums
    "user-library-modify", // Manage user's saved tracks and albums
  ].join(" "),
};
