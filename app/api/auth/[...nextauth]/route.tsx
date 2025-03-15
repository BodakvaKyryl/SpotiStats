import NextAuth from "next-auth";
import "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";
import { environment } from "@/environment";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}

const handler = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: environment.clientId,
      clientSecret: environment.clientSecret,
      authorization: {
        params: {
          scope: "user-read-email user-top-read playlist-read-private playlist-modify-private playlist-modify-public",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "spotify") {
        return { ...token, accessToken: account.access_token };
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
