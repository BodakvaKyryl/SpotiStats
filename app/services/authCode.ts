import { authorizationEndpoint, clientId, redirectUrl, scope, tokenEndpoint } from "keys";
import { URLSearchParams } from "url";

interface SpotifyTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

class TokenManager {
  get accessToken(): string | null {
    return localStorage.getItem("access_token") || null;
  }

  get refreshToken(): string | null {
    return localStorage.getItem("refresh_token") || null;
  }

  get expiresIn(): string | null {
    return localStorage.getItem("expires_in") || null;
  }

  get expires(): Date | null {
    const expiresStr = localStorage.getItem("expires");
    return expiresStr ? new Date(expiresStr) : null;
  }

  save(response: SpotifyTokenResponse): void {
    const { access_token, refresh_token, expires_in } = response;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("expires_in", expires_in.toString());

    const now = new Date();
    const expiry = new Date(now.getTime() + expires_in * 1000);
    localStorage.setItem("expires", expiry.toISOString());
  }

  clear(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expires_in");
    localStorage.removeItem("expires");
    localStorage.removeItem("code_verifier");
  }

  isLoggedIn(): boolean {
    return !!this.accessToken && !!this.expires && new Date() < this.expires;
  }

  isExpired(): boolean {
    return !!this.expires && new Date() > this.expires;
  }
}

// Singleton instance of TokenManager
export const tokenManager = new TokenManager();

export async function redirectToSpotifyAuthorize(): Promise<void> {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomValues = crypto.getRandomValues(new Uint8Array(64));
  const randomString = Array.from(randomValues)
    .map((x) => possible[x % possible.length])
    .join("");

  const codeVerifier = randomString;
  const data = new TextEncoder().encode(codeVerifier);
  const hashed = await crypto.subtle.digest("SHA-256", data);

  const codeChallenge = btoa(String.fromCharCode(...new Uint8Array(hashed)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  localStorage.setItem("code_verifier", codeVerifier);

  const authUrl = new URL(authorizationEndpoint);
  const params = {
    response_type: "code",
    client_id: clientId,
    scope: scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUrl,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
}

// Exchanges an authorization code for an access token
export async function getToken(code: string): Promise<SpotifyTokenResponse> {
  const codeVerifier = localStorage.getItem("code_verifier");

  if (!codeVerifier) {
    throw new Error("Code  verifier not found in storage");
  }

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUrl,
      code_verifier: codeVerifier,
    }),
  });

  if (!response.ok) {
    throw new Error(`Token exchange failed: ${response.statusText}`);
  }

  return await response.json();
}

// Refreshes the current access token using the refresh token
export async function refreshToken(): Promise<SpotifyTokenResponse> {
  const refreshToken = tokenManager.refreshToken;

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error(`Token refresh failed: ${response.statusText}`);
  }

  return await response.json();
}

// Fetches the user's Spotify profile data
export async function getUserData(): Promise<SpotifyUserProfile> {
  const accessToken = tokenManager.accessToken;

  if (!accessToken) {
    throw new Error("No access token available");
  }

  const response = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user data: ${response.statusText}`);
  }

  return await response.json();
}

// Handles the authentication callback by extracting the code from the URL and exchanging it for an access token
export async function handleAuthCallback(): Promise<boolean> {
  const args = new URLSearchParams(window.location.search);
  const code = args.get("code");

  if (code) {
    try {
      const token = await getToken(code);
      tokenManager.save(token);

      // Remove code from URL for clean navigation
      const url = new URL(window.location.href);
      url.searchParams.delete("code");
      const updatedUrl = url.search ? url.href : url.href.replace("?", "");
      window.history.replaceState({}, document.title, updatedUrl);

      return true;
    } catch (error) {
      console.error("Authentication error:", error);
      return false;
    }
  }

  return false;
}

// Logs the user out by clearing tokens from storage
export function logout(): void {
  tokenManager.clear();
  window.location.href = redirectUrl;
}
