export const clientId = process.env.VITE_CLIENT_ID;
export const clientSecret = process.env.VITE_CLIENT_SECRET;
export const redirectUri = process.env.VITE_REDIRECT_URI;

export const redirectUrl = "http://localhost:5173/home";
export const authorizationEndpoint = "https://accounts.spotify.com/authorize";
export const tokenEndpoint = "https://accounts.spotify.com/api/token";
export const scope = "user-read-private user-read-email";
