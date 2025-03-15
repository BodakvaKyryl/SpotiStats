import { environment } from "@/environment";
import type { SpotifyUserProfile } from "@/types";

interface SpotifyTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

export class TokenManager {
  private static isClient(): boolean {
    return typeof window !== "undefined" && typeof localStorage !== "undefined";
  }

  static get accessToken(): string | null {
    return this.isClient() ? localStorage.getItem("access_token") || null : null;
  }

  static get refreshToken(): string | null {
    return this.isClient() ? localStorage.getItem("refresh_token") || null : null;
  }

  static get expiresIn(): string | null {
    return this.isClient() ? localStorage.getItem("expires_in") || null : null;
  }

  static get expires(): Date | null {
    if (!this.isClient()) return null;
    const expiresStr = localStorage.getItem("expires");
    return expiresStr ? new Date(expiresStr) : null;
  }

  static save(response: SpotifyTokenResponse): void {
    if (!this.isClient()) return;

    const { access_token, refresh_token, expires_in } = response;

    console.log("Saving tokens to localStorage", { access_token: !!access_token, refresh_token: !!refresh_token });

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("expires_in", expires_in.toString());

    const now = new Date();
    const expiry = new Date(now.getTime() + expires_in * 1000);
    localStorage.setItem("expires", expiry.toISOString());
  }

  static clear(): void {
    if (!this.isClient()) return;

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expires_in");
    localStorage.removeItem("expires");
    localStorage.removeItem("code_verifier");
  }

  static isLoggedIn(): boolean {
    if (!this.isClient()) return false;

    const result = !!this.accessToken;
    console.log("Checking isLoggedIn", {
      hasAccessToken: !!this.accessToken,
      hasExpires: !!this.expires,
      isNotExpired: this.expires ? new Date() < this.expires : false,
      result,
    });
    return result;
  }

  static isExpired(): boolean {
    if (!this.isClient()) return true;
    return !!this.expires && new Date() > this.expires;
  }
}

export async function redirectToSpotifyAuthorize(): Promise<void> {
  try {
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

    const authUrl = new URL(environment.authorizationEndpoint);
    const params = {
      response_type: "code",
      client_id: environment.clientId,
      scope: environment.scope,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: environment.redirectUrl,
    };

    console.log("Spotify Authorization Request Details:", {
      authorizationEndpoint: environment.authorizationEndpoint,
      clientId: environment.clientId,
      redirectUrl: environment.redirectUrl,
      scope: environment.scope,
      codeChallenge,
    });

    authUrl.search = new URLSearchParams(params).toString();
    console.log("Full Authorization URL:", authUrl.toString());

    window.location.href = authUrl.toString();
  } catch (error) {
    console.error("Error in redirectToSpotifyAuthorize:", error);
    throw error;
  }
}

export async function getToken(code: string): Promise<SpotifyTokenResponse> {
  const codeVerifier = localStorage.getItem("code_verifier");

  if (!codeVerifier) {
    throw new Error("Code verifier not found in storage");
  }

  const response = await fetch(environment.tokenEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: environment.clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: environment.redirectUrl,
      code_verifier: codeVerifier,
    }),
  });

  if (!response.ok) {
    throw new Error(`Token exchange failed: ${response.statusText}`);
  }

  return await response.json();
}

export async function refreshToken(): Promise<SpotifyTokenResponse> {
  const refreshToken = TokenManager.refreshToken;

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await fetch(environment.tokenEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: environment.clientId,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error(`Token refresh failed: ${response.statusText}`);
  }

  return await response.json();
}

export async function getUserData(): Promise<SpotifyUserProfile> {
  const accessToken = TokenManager.accessToken;

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

export async function handleAuthCallback(): Promise<boolean> {
  if (typeof window === "undefined") return false;

  try {
    const args = new URLSearchParams(window.location.search);
    const code = args.get("code");
    const error = args.get("error");

    console.log("Auth Callback Debug:", {
      code: code ? "Present" : "Missing",
      error: error || "None",
    });

    if (error) {
      console.error("Spotify Authorization Error:", {
        error,
        errorDescription: args.get("error_description"),
      });
      return false;
    }

    if (code) {
      const token = await getToken(code);
      TokenManager.save(token);

      const url = new URL(window.location.href);
      url.searchParams.delete("code");
      const updatedUrl = url.search ? url.href : url.href.replace("?", "");
      window.history.replaceState({}, document.title, updatedUrl);

      return true;
    }

    return false;
  } catch (error) {
    console.error("Complete Authentication Error:", error);
    return false;
  }
}

export function logout(): void {
  TokenManager.clear();
  window.location.href = environment.redirectUrl;
}
