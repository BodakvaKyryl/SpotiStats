"use client";

import { CircularProgress, Paper } from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { SpotifyButton } from "@/components";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log("Home page: Not authenticated, redirecting to login");
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="container mx-auto flex justify-center mt-10">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-md">
      <div className="mt-10 flex flex-col items-center space-y-8">
        <Paper elevation={3} className="p-8 w-full flex flex-col items-center">
          <h1 className="text-2xl font-semibold mb-4">Welcome back, {session?.user?.name}</h1>
          <p className="text-base mb-4">You are now logged in with Spotify!</p>

          {session?.user?.image && (
            <div className="mb-6 relative w-[100px] h-[100px]">
              <Image
                src={session.user.image}
                alt="Profile"
                fill
                className="rounded-full object-cover"
                sizes="100px"
                priority
              />
            </div>
          )}

          <SpotifyButton
            variant="contained"
            color="primary"
            onClick={() => signOut({ callbackUrl: "/" })}
            sx={{ mt: 2 }}>
            Log Out
          </SpotifyButton>
        </Paper>
      </div>
    </div>
  );
}
