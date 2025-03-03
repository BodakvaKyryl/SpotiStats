import { Alert, Box, Button, CircularProgress, Container, Paper, Typography } from "@mui/material";
import { useAuthContext } from "~/providers";
import { handleAuthCallback } from "~/services/authCode";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const SpotifyLoginPage = () => {
  const [isProcessingCallback, setIsProcessingCallback] = useState<boolean>(false);
  const [callbackError, setCallbackError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { user, isLoading, error, login, isAuthenticated, refreshUserToken } = useAuthContext();

  useEffect(() => {
    const processCallback = async () => {
      if (searchParams.has("code")) {
        setIsProcessingCallback(true);
        try {
          const success = await handleAuthCallback();
          if (success) {
            await refreshUserToken();

            setTimeout(() => {
              navigate("/home", { replace: true });
            }, 500);
          }
        } catch (err) {
          console.error("Authentication callback error", err);
          setCallbackError("Failed to complete authentication");
        } finally {
          setIsProcessingCallback(false);
        }
      }
    };

    processCallback();
  }, [searchParams, navigate, refreshUserToken]);

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
          {isProcessingCallback || isLoading ? (
            <CircularProgress />
          ) : callbackError || error ? (
            <>
              <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
                {callbackError || error}
              </Alert>
              <Button variant="contained" onClick={login} color="primary">
                Try Again
              </Button>
            </>
          ) : isAuthenticated ? (
            <>
              <Typography variant="h5" gutterBottom>
                Welcome back, {user?.display_name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                You are now logged in!
              </Typography>
              <Button variant="contained" onClick={() => navigate("/home")} sx={{ mt: 2 }}>
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
                onClick={login}
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
