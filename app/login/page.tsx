"use client";

import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const SpotifyLoginPage = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

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
          {isLoading ? (
            <Typography variant="body1">Checking authentication status...</Typography>
          ) : isAuthenticated && session?.user ? (
            <>
              <Typography variant="h5" gutterBottom>
                Welcome back, {session.user.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                You are now logged in!
              </Typography>
              <Button variant="contained" onClick={() => redirect("/home")} sx={{ mt: 2 }}>
                Go to Home
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h4" gutterBottom>
                Connect to Spotify
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, textAlign: "center" }}>
                Login with your Spotify account to view your stats and playlists
              </Typography>
              <Button
                variant="contained"
                onClick={() => signIn("spotify", { callbackUrl: "/home" })}
                size="large"
                sx={{
                  bgcolor: "#1db954",
                  "&:hover": {
                    bgcolor: "#1ed760",
                  },
                }}>
                Log in with Spotify
              </Button>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default SpotifyLoginPage;
