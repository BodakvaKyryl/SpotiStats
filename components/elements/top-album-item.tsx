"use client";

import { PopularityDots } from "@/components";
import { AlbumItemProps } from "@/types";
import { Avatar, Box, Typography } from "@mui/material";
import { useState } from "react";
import { AlbumModal } from "./modals/album-modal";

export const TopAlbumItem = ({ album }: AlbumItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Box
        className="flex cursor-pointer flex-col gap-2 p-2 transition-colors hover:bg-gray-50 dark:hover:bg-neutral-900"
        onClick={handleClick}>
        <Avatar
          alt={album.name}
          src={album.images[0]?.url}
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
            {album.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {album.artists.map((artist) => artist.name).join(", ")}
          </Typography>
          {album.popularity && <PopularityDots popularity={album.popularity} />}
        </div>
      </Box>

      <AlbumModal album={album} open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
