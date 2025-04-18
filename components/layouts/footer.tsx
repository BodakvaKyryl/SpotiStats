"use client";

import { colors } from "@/styles/colors";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box, Container, IconButton, Link, Typography, alpha, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledFooter = styled("footer")(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1.5, 0),
  background: alpha(theme.palette.background.paper, 0.7),
  backdropFilter: "blur(10px)",
  borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  color: theme.palette.text.secondary,
  position: "relative",
  zIndex: 10,
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  backdropFilter: "blur(5px)",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    color: colors.spotifyGreen,
    backgroundColor: alpha(colors.spotifyGreen, 0.1),
    transform: "scale(1.05)",
  },
  margin: theme.spacing(0, 1),
}));

const SpotifyLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: "none",
  fontSize: "0.875rem",
  marginLeft: theme.spacing(1),
  padding: "6px 12px",
  borderRadius: theme.shape.borderRadius,
  transition: "all 0.2s ease-in-out",
  backdropFilter: "blur(5px)",
  display: "flex",
  alignItems: "center",
  "&:hover": {
    color: colors.spotifyGreen,
    backgroundColor: alpha(colors.spotifyGreen, 0.1),
  },
}));

const SpotifyIcon = styled("img")({
  height: "20px",
  marginRight: "8px",
  filter: "brightness(0.7)",
});

interface FooterProps {
  githubUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  emailAddress?: string;
  spotifyUrl?: string;
}

export const Footer = ({
  githubUrl = "https://github.com/BodakvaKyryl",
  linkedinUrl = "https://www.linkedin.com/in/kyryl-bodakva-3303b12a0/",
  instagramUrl = "https://www.instagram.com/kyryl_bodakva/",
  emailAddress = "bodakvakyryl@gmail.com",
  spotifyUrl = "https://open.spotify.com/user/ievcmk9agmwcno7e7yowtxkra",
}: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const theme = useTheme();

  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}>
          <Typography
            variant="body2"
            sx={{
              color: alpha(theme.palette.text.primary, 0.7),
              fontWeight: 500,
            }}>
            © {currentYear} SpotiStats. All rights reserved.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              background: alpha(theme.palette.background.paper, 0.3),
              backdropFilter: "blur(5px)",
              padding: "8px 40px",
              borderRadius: theme.shape.borderRadius,
            }}>
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
              <SocialIcon size="small">
                <GitHubIcon fontSize="small" />
              </SocialIcon>
            </Link>
            <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer">
              <SocialIcon size="small">
                <LinkedInIcon fontSize="small" />
              </SocialIcon>
            </Link>
            <Link href={instagramUrl} target="_blank" rel="noopener noreferrer">
              <SocialIcon size="small">
                <InstagramIcon fontSize="small" />
              </SocialIcon>
            </Link>
            <Link href={`mailto:${emailAddress}`}>
              <SocialIcon size="small">
                <EmailIcon fontSize="small" />
              </SocialIcon>
            </Link>
            <SpotifyLink href={spotifyUrl} target="_blank" rel="noopener noreferrer">
              <SpotifyIcon
                src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png"
                alt="Spotify"
              />
              Spotify
            </SpotifyLink>
          </Box>
        </Box>
      </Container>
    </StyledFooter>
  );
};
