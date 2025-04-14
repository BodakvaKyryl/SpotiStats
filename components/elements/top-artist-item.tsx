"use client";

import { PopularityDots } from "@/components";
import { useSpotifyEmbed } from "@/hooks/useSpotifyEmbed";
import { ArtistItemProps } from "@/types";
import { Avatar, Box, Typography } from "@mui/material";
import { useState } from "react";
import { ArtistModal } from "./modals/artist-modal";

export const TopArtistItem = ({ artist }: ArtistItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const { embedHtml, isLoading: isEmbedHtmlLoading } = useSpotifyEmbed(artist.external_urls.spotify, isModalOpen);

  return (
    <>
      <Box
        className="flex cursor-pointer flex-col gap-2 p-2 transition-colors hover:bg-gray-50 dark:hover:bg-neutral-900"
        onClick={handleClick}>
        <Avatar
          alt={artist.name}
          src={artist.images[0]?.url}
          variant="rounded"
          sx={{
            width: "100%",
            height: "auto",
            aspectRatio: "1/1",
            borderRadius: "8px",
          }}
        />
        <div className="flex flex-col">
          <Typography variant="subtitle2" noWrap sx={{ fontWeight: 600 }}>
            {artist.name}
          </Typography>
          {artist.genres.length > 0 && (
            <Typography variant="caption" color="text.secondary" noWrap>
              {artist.genres.slice(0, 2).join(" • ")}
            </Typography>
          )}
          {artist.popularity && <PopularityDots popularity={artist.popularity} />}
        </div>
      </Box>

      <ArtistModal
        artist={artist}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        embedded={{
          html: embedHtml,
          isLoading: isEmbedHtmlLoading,
        }}
      />
    </>
  );
};
