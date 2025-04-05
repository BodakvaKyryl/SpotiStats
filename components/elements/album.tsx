import { AlbumItemProps } from "@/types";
import { CardContent, Typography } from "@mui/material";
import { StyledCard, PositionBadge, ImageContainer, MediaImage } from "./shared/media-card";
import { PopularityDots } from "./shared/popularity-dots";

export const AlbumItem = ({ album, position, onClick }: AlbumItemProps) => (
  <StyledCard elevation={0} variant="outlined" onClick={onClick}>
    {position && <PositionBadge>{position}</PositionBadge>}

    <ImageContainer>
      <MediaImage src={album.images[0]?.url} alt={album.name} className="album-image" />
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
        {album.name}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mb: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
        }}>
        {album.artists.map((artist) => artist.name).join(", ")}
      </Typography>

      <div className="flex justify-center">
        <PopularityDots popularity={album.popularity} />
      </div>
    </CardContent>
  </StyledCard>
);
