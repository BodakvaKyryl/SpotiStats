"use client";

import { PopularityDots } from "@/components";
import { AlbumItemProps } from "@/types";
import { CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { AlbumModal } from "./modals/album-modal";
import { ImageContainer, MediaImage, PositionBadge, StyledCard } from "./shared/media-card";

export const AlbumItem = ({ album, position }: AlbumItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <StyledCard elevation={0} variant="outlined" onClick={handleClick}>
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

      <AlbumModal album={album} open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
