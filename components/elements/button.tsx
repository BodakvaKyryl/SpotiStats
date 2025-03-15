import { Button, ButtonProps } from "@mui/material";
import { colors } from "@/styles/colors";

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

export const LogoutButton = ({ children, ...props }: ButtonProps) => (
  <Button variant="outlined" color="primary" size="medium" {...props}>
    {children}
  </Button>
);
