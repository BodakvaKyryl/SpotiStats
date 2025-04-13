"use client";

import { PopularityDots } from "@/components";
import { ArtistItemProps } from "@/types";
import { CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { ArtistModal } from "./modals/artist-modal";
import { ImageContainer, MediaImage, PositionBadge, StyledCard } from "./shared/media-card";

export const ArtistCard = ({ artist, position, showGenres = true }: ArtistItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <StyledCard elevation={0} variant="outlined" onClick={handleClick}>
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

          {showGenres && artist.genres.length > 0 && (
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
              {artist.genres.slice(0, 2).join(" • ")}
            </Typography>
          )}

          <div className="flex justify-center">
            <PopularityDots popularity={artist.popularity} />
          </div>
        </CardContent>
      </StyledCard>

      <ArtistModal artist={artist} open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
