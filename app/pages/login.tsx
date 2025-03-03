import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useAuthContext } from "~/providers";
import { useNavigate } from "react-router";

const SpotifyLoginPage = () => {
  const { isAuthenticated, login, user } = useAuthContext();

  const navigate = useNavigate();

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
          {isAuthenticated ? (
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
