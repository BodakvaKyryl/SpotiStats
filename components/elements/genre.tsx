import { CardContent, Typography } from "@mui/material";
import { StyledCard, PositionBadge } from "./shared/media-card";

interface GenreCardProps {
  genre: {
    name: string;
    count: number;
    artists: string[];
  };
  position: number;
}

export const GenreCard = ({ genre, position }: GenreCardProps) => (
  <StyledCard elevation={0} variant="outlined">
    {position && <PositionBadge>{position}</PositionBadge>}

    <CardContent sx={{ textAlign: "center", p: 2 }}>
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
