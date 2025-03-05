"use client";

import { useLoginCallback } from "@/hooks";
import { useAuthContext } from "@/providers";
import { Alert, Box, CircularProgress, Container, Paper, Typography } from "@mui/material";

// import { useNavigate } from "react-router";

export default function Home() {
  const { error, isLoading: isLogLoading } = useLoginCallback();
  const { isAuthenticated, user, isLoading: isAuthLoading } = useAuthContext();
  // const navigate = useNavigate();

  const isLoading = isLogLoading || isAuthLoading;

  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated) {
  //     console.log("Home page: Not authenticated, redirecting to login");
  //     // navigate("/login");
  //   } else if (!isLoading && !isAuthenticated) {
  //     console.log("Home page: User is authenticated", !!user);
  //   }
  // }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return <CircularProgress />;
  }

  // if (!isAuthenticated) {
  //   return null;
  // }

  return (
    <>
      {/* <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-6 text-3xl font-bold">Welcome, {user?.display_name}!</h1>
        <div className="p-6 bg-green-100 rounded-lg shadow">
          <p className="text-lg">You are successfully logged in with Spotify.</p>
          <p className="mt-2 text-gray-700">
            You can now explore your Spotify stats and playlists using the navigation links above.
          </p>
        </div>
      </div> */}

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
            {isAuthenticated && (
              <>
                <Typography variant="h5" gutterBottom>
                  Welcome back, {user?.display_name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  You are now logged in!
                </Typography>
              </>
            )}
          </Paper>
        </Box>
      </Container>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
    </>
  );
}
