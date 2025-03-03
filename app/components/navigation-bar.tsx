import { AppBar, Avatar, Box, Button, CircularProgress, Stack, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuthContext } from "~/providers";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "#1db954",
  },
});

export const Navbar = () => {
  const { user, isLoading, login, logout, isAuthenticated } = useAuthContext();

  return (
    <AppBar position="fixed" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          <StyledLink to="/">SpotiStats</StyledLink>
        </Typography>

        {/* Navigation TODO */}
        {isAuthenticated && (
          <Stack direction="row" spacing={3} sx={{ flexGrow: 1, ml: 4 }}>
            <StyledLink to="/home">Overall</StyledLink>
            <StyledLink to="/songs">Songs</StyledLink>
            <StyledLink to="/albums">Albums</StyledLink>
            <StyledLink to="/artists">Artists</StyledLink>
          </Stack>
        )}

        <Box>
          {isLoading ? (
            <CircularProgress size={24} />
          ) : isAuthenticated && user ? (
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar src={user.images?.[0]?.url} alt={user.display_name} sx={{ width: 32, height: 32 }}>
                {user.display_name?.charAt(0)}
              </Avatar>
              <Typography variant="body2">{user.display_name}</Typography>
              <Button variant="outlined" color="inherit" onClick={logout} size="small">
                Log Out
              </Button>
            </Stack>
          ) : (
            <Button
              variant="contained"
              onClick={login}
              sx={{
                bgcolor: "#1db954",
                "&:hover": {
                  bgcolor: "#1ed760",
                },
              }}>
              Log In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
