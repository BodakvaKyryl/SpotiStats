import NextAuth from "next-auth";
import "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";
import { environment } from "@/environment";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: string;
  }
}

const handler = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: environment.clientId,
      clientSecret: environment.clientSecret,
      authorization: {
        params: {
          scope: environment.scope,
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: Number(account.expires_at) * 1000,
        };
      }
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(`${environment.clientId}:${environment.clientSecret}`).toString(
              "base64"
            )}`,
          },
          body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: token.refreshToken as string,
          }),
        });

        const data = await response.json();

        return {
          ...token,
          accessToken: data.access_token,
          accessTokenExpires: Date.now() + data.expires_in * 1000,
        };
      } catch (error) {
        console.error("Error refreshing access token", error);
        return { ...token, error: "RefreshAccessTokenError" };
      }
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        error: token.error,
      };
    },
  },
});

export { handler as GET, handler as POST };
