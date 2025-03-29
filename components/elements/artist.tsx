import { ArtistItemProps } from "@/types";
import { CardContent, Typography } from "@mui/material";
import { StyledCard, PositionBadge, ImageContainer, MediaImage } from "./shared/media-card";

export const ArtistCard = ({ artist, position, showGenres = true, onClick }: ArtistItemProps) => (
  <StyledCard elevation={0} variant="outlined" onClick={onClick}>
    {position && <PositionBadge>{position}</PositionBadge>}

    <ImageContainer>
      <MediaImage src={artist.images[0]?.url} alt={artist.name} className="artist-image" />
    </ImageContainer>

    <CardContent sx={{ textAlign: "center", p: 0, flexGrow: 1 }}>
      <Typography
        variant="subtitle1"
        component="h3"
        sx={{
          fontWeight: 600,
          mb: 0.5,
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
        }}>
        {artist.name}
      </Typography>
      {showGenres && artist.genres?.length > 0 && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: "small",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
          }}>
          {artist.genres.slice(0, 5).join(" • ")}
        </Typography>
      )}
    </CardContent>
  </StyledCard>
);
