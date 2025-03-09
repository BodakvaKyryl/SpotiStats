"use client";

import { AppBar, Avatar, Box, Button, CircularProgress, Stack, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const StyledLink = styled(Link)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "#1db954",
  },
});

export const Navbar = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  return (
    <AppBar position="fixed" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          <StyledLink href="/">SpotiStats</StyledLink>
        </Typography>

        {isAuthenticated && (
          <Stack direction="row" spacing={3} sx={{ flexGrow: 1, ml: 4 }}>
            <StyledLink href="/home">Overall</StyledLink>
            <StyledLink href="/songs">Songs</StyledLink>
            <StyledLink href="/albums">Albums</StyledLink>
            <StyledLink href="/artists">Artists</StyledLink>
          </Stack>
        )}

        <Box>
          {isLoading ? (
            <CircularProgress size={24} />
          ) : isAuthenticated && session?.user ? (
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src={session.user.image || undefined}
                alt={session.user.name || "User"}
                sx={{ width: 32, height: 32 }}>
                {session.user.name?.charAt(0)}
              </Avatar>
              <Typography variant="body2">{session.user.name}</Typography>
              <Button variant="outlined" color="inherit" onClick={() => signOut({ callbackUrl: "/" })} size="small">
                Log Out
              </Button>
            </Stack>
          ) : (
            <Button
              variant="contained"
              onClick={() => signIn("spotify")}
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
