"use client";

import { AppBar, Avatar, Box, CircularProgress, Stack, Toolbar, Typography, useTheme, alpha } from "@mui/material";
import { styled } from "@mui/material/styles";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { LogoutButton, SpotifyButton } from "../elements/button";
import { colors } from "@/styles/colors";

const StyledNavBar = styled(AppBar)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.7),
  backdropFilter: "blur(10px)",
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  boxShadow: "none",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none",
  position: "relative",
  padding: "4px 0",
  transition: "color 0.2s ease-in-out",
  "&:hover": {
    color: colors.spotifyGreen,
    "&::after": {
      width: "100%",
    },
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "0%",
    height: "2px",
    backgroundColor: colors.spotifyGreen,
    transition: "width 0.2s ease-in-out",
  },
}));

const UserStack = styled(Stack)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.5),
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 2),
  backdropFilter: "blur(5px)",
}));

export const Navbar = () => {
  const { data: session, status } = useSession();
  const theme = useTheme();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  const navigationLinks = [
    { href: "/home", label: "Overall" },
    { href: "/songs", label: "Songs" },
    { href: "/albums", label: "Albums" },
    { href: "/artists", label: "Artists" },
  ];

  return (
    <StyledNavBar position="fixed">
      <Toolbar>
        <Typography
          variant="h5"
          component={Link}
          href="/"
          sx={{
            fontWeight: 600,
            color: theme.palette.primary.main,
            textDecoration: "none",
            "&:hover": {
              color: theme.palette.primary.dark,
            },
          }}>
          SpotiStats
        </Typography>

        {isAuthenticated && (
          <Stack
            direction="row"
            spacing={4}
            sx={{
              flexGrow: 1,
              ml: 6,
              display: { xs: "none", md: "flex" },
            }}>
            {navigationLinks.map(({ href, label }) => (
              <StyledLink key={href} href={href}>
                {label}
              </StyledLink>
            ))}
          </Stack>
        )}

        <Box sx={{ ml: "auto" }}>
          {isLoading ? (
            <CircularProgress size={24} sx={{ color: colors.spotifyGreen }} />
          ) : isAuthenticated && session?.user ? (
            <UserStack direction="row" spacing={2} alignItems="center">
              <Avatar
                src={session.user.image || undefined}
                alt={session.user.name || "User"}
                sx={{
                  width: 32,
                  height: 32,
                  border: `2px solid ${alpha(colors.spotifyGreen, 0.3)}`,
                }}>
                {session.user.name?.charAt(0)}
              </Avatar>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  display: { xs: "none", sm: "block" },
                }}>
                {session.user.name}
              </Typography>
              <LogoutButton
                onClick={() => signOut({ callbackUrl: "/login" })}
                sx={{
                  backdropFilter: "blur(5px)",
                  "&:hover": {
                    bgcolor: alpha(colors.spotifyGreen, 0.1),
                  },
                }}>
                Log Out
              </LogoutButton>
            </UserStack>
          ) : (
            <SpotifyButton
              onClick={() => signIn("spotify")}
              sx={{
                backdropFilter: "blur(5px)",
                "&:hover": {
                  bgcolor: alpha(colors.spotifyGreen, 0.9),
                },
              }}>
              Log In
            </SpotifyButton>
          )}
        </Box>
      </Toolbar>
    </StyledNavBar>
  );
};
