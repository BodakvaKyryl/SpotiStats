export const environment = {
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID || "",
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET || "",
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || "",

  redirectUrl: "http://localhost:3000/home",
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
  scope: "user-read-private user-read-email",
};
