import { Button, ButtonProps } from "@mui/material";
import { colors } from "@/styles/colors";

interface SpotifyLinkButtonProps extends ButtonProps {
  href: string;
}

export const SpotifyButton = ({ children, ...props }: ButtonProps) => (
  <Button
    variant="contained"
    size="medium"
    {...props}
    sx={{
      bgcolor: colors.spotifyGreen,
      "&:hover": {
        bgcolor: colors.spotifyGreenHover,
      },
      ...props.sx,
    }}>
    {children}
  </Button>
);

export const SpotifyLinkButton = ({ children, href, ...props }: SpotifyLinkButtonProps) => (
  <Button
    component="a"
    variant="contained"
    color="primary"
    size="small"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    {...props}>
    {children}
  </Button>
);

export const LogoutButton = ({ children, ...props }: ButtonProps) => (
  <Button variant="outlined" color="primary" size="medium" {...props}>
    {children}
  </Button>
);
