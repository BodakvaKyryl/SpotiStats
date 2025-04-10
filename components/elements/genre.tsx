import { CardContent, Typography } from "@mui/material";
import { StyledCard, PositionBadge } from "@/components";
import getGradientForGenre from "@/utils/gradient.helper";

interface GenreCardProps {
  genre: {
    name: string;
    count: number;
    artists: string[];
  };
  position: number;
}

export const GenreCard = ({ genre, position }: GenreCardProps) => (
  <StyledCard
    elevation={0}
    variant="outlined"
    sx={{
      position: "relative",
      overflow: "hidden",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: 3,
      },
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: getGradientForGenre(genre.name),
        opacity: 0.1,
        transition: "opacity 0.3s ease, transform 0.5s ease",
      },
      "&:hover::before": {
        opacity: 0.15,
        transform: "scale(1.05)",
      },
    }}>
    {position && <PositionBadge>{position}</PositionBadge>}

    <CardContent sx={{ textAlign: "center", p: 2, position: "relative" }}>
      <Typography
        variant="h6"
        component="h3"
        sx={{
          fontWeight: 600,
          mb: 1,
          textTransform: "capitalize",
        }}>
        {genre.name}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {genre.count} {genre.count === 1 ? "artist" : "artists"}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          fontSize: "small",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}>
        {genre.artists.join(" • ")}
      </Typography>
    </CardContent>
  </StyledCard>
);
