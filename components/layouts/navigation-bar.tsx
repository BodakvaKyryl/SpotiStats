"use client";

import {
  AppBar,
  Avatar,
  Box,
  CircularProgress,
  Stack,
  Toolbar,
  Typography,
  useTheme,
  alpha,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { LogoutButton, SpotifyButton } from "../elements/button";
import { colors } from "@/styles/colors";
import { useState } from "react";

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

const MobileDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: 240,
    background: alpha(theme.palette.background.paper, 0.95),
    backdropFilter: "blur(10px)",
    borderLeft: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    padding: theme.spacing(2),
  },
}));

const MobileMenuItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  color: theme.palette.text.primary,
  transition: "all 0.2s ease-in-out",
  "& a": {
    color: "inherit",
    textDecoration: "none",
    width: "100%",
  },
  "&:hover": {
    color: colors.spotifyGreen,
    backgroundColor: alpha(colors.spotifyGreen, 0.1),
  },
  "& .MuiListItemText-primary": {
    fontWeight: 500,
    textAlign: "center",
  },
}));

const MobileMenu = ({
  open,
  onClose,
  links,
}: {
  open: boolean;
  onClose: () => void;
  links: Array<{ href: string; label: string }>;
}) => (
  <MobileDrawer anchor="right" open={open} onClose={onClose}>
    <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
      <IconButton onClick={onClose} sx={{ color: "text.primary" }}>
        <CloseIcon />
      </IconButton>
    </Box>
    <List>
      {links.map(({ href, label }) => (
        <MobileMenuItem key={href}>
          <Link href={href} onClick={onClose}>
            <ListItemText primary={label} />
          </Link>
        </MobileMenuItem>
      ))}
    </List>
  </MobileDrawer>
);

export const Navbar = () => {
  const { data: session, status } = useSession();
  const theme = useTheme();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <>
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

            <IconButton
              onClick={() => setMobileMenuOpen(true)}
              sx={{
                ml: "auto",
                mr: 2,
                display: { xs: "flex", md: "none" },
                color: "text.primary",
                "&:hover": {
                  color: colors.spotifyGreen,
                },
              }}>
              <MenuIcon />
            </IconButton>

            <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} links={navigationLinks} />
          </>
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
