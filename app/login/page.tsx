"use client";

import { colors } from "@/styles/colors";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SpotifyLoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    if (isAuthenticated && session?.accessToken) {
      router.push("/home");
    }
  }, [isAuthenticated, session, router]);

  return (
    <div
      className="flex h-screen w-full items-center justify-center p-4"
      style={{ backgroundColor: colors.spotifyBlack }}>
      <div className="w-full max-w-md">
        <div className="mb-12 flex flex-col items-center">
          <div className="mb-2 text-5xl font-bold" style={{ color: colors.spotifyGreen }}>
            SpotiStats
          </div>
          <div className="text-sm" style={{ color: colors.spotifyGreyLight }}>
            Dive deeper into your music
          </div>
        </div>

        <div className="rounded-xl p-8 shadow-lg" style={{ backgroundColor: colors.spotifyGreyDark }}>
          {isLoading ? (
            <div className="flex justify-center py-6">
              <div
                className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"
                style={{ borderColor: colors.spotifyGreen, borderTopColor: "transparent" }}></div>
            </div>
          ) : isAuthenticated && session?.user ? (
            <div className="space-y-6 text-center">
              <div className="flex flex-col items-center gap-2">
                {session.user.image && (
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full border-2"
                    style={{ borderColor: colors.spotifyGreen }}
                  />
                )}
                <h2 className="text-2xl font-bold text-white">Welcome back, {session.user.name}</h2>
              </div>
              <p style={{ color: colors.spotifyGreyLight }}>Your account is connected</p>
              <button
                onClick={() => router.push("/home")}
                className="w-full rounded-full py-3 font-bold transition-colors"
                style={{
                  backgroundColor: colors.spotifyGreen,
                  color: "white",
                  ":hover": { backgroundColor: colors.spotifyGreenHover },
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = colors.spotifyGreenHover)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = colors.spotifyGreen)}>
                Explore Your Stats
              </button>
            </div>
          ) : (
            <div className="space-y-6 text-center">
              <h2 className="text-xl font-medium text-white">Connect with Spotify</h2>
              <p style={{ color: colors.spotifyGreyLight }}>
                Login to analyze your listening patterns and discover insights about your music taste
              </p>
              <button
                onClick={() => signIn("spotify", { callbackUrl: "/home" })}
                className="flex w-full items-center justify-center gap-2 rounded-full py-3 font-bold transition-colors"
                style={{
                  backgroundColor: colors.spotifyGreen,
                  color: "white",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = colors.spotifyGreenHover)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = colors.spotifyGreen)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                Sign in with Spotify
              </button>
              <div className="flex items-center justify-center gap-1 pt-4">
                <div className="h-px flex-1" style={{ backgroundColor: colors.spotifyGreyMedium }}></div>
                <span className="px-2 text-xs" style={{ color: colors.spotifyGreyMedium }}>
                  SpotiStats
                </span>
                <div className="h-px flex-1" style={{ backgroundColor: colors.spotifyGreyMedium }}></div>
              </div>
              <p className="mt-2 text-xs" style={{ color: colors.spotifyGreyMedium }}>
                Your personal music analytics platform
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpotifyLoginPage;
