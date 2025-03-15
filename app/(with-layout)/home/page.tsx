"use client";

import { Box, CircularProgress, Container, Paper, Typography, Button } from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import TopSongs from "@/components/layouts/top-songs";

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

  if (isLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!isAuthenticated) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Typography variant="h5" gutterBottom>
            Welcome back, {session?.user?.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            You are now logged in with Spotify!
          </Typography>

          {session?.user?.image && (
            <Box
              sx={{
                mb: 3,
                position: "relative",
                width: "100px",
                height: "100px",
              }}>
              <Image
                src={session.user.image}
                alt="Profile"
                fill
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                sizes="100px"
                priority
              />
            </Box>
          )}

          <Button variant="contained" color="primary" onClick={() => signOut({ callbackUrl: "/" })} sx={{ mt: 2 }}>
            Log Out
          </Button>
        </Paper>
        <TopSongs />
      </Box>
    </Container>
  );
}
