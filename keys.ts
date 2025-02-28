export const clientId = process.env.CLIENT_ID;
export const clientSecret = process.env.CLIENT_SECRET;
export const redirectUri = process.env.REDIRECT_URI;

export const redirectUrl = "http://localhost:5173/login/callback";
export const authorizationEndpoint = "https://accounts.spotify.com/authorize";
export const tokenEndpoint = "https://accounts.spotify.com/api/token";
export const scope = "user-read-private user-read-email";
