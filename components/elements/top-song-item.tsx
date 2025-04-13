"use client";

import { PopularityDots, SongModal } from "@/components";
import { SongItemProps } from "@/types";
import { Avatar, Box, Typography } from "@mui/material";
import { useState } from "react";

export const TopSongItem = ({ song }: SongItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Box
        className="flex flex-col gap-2 p-2 transition-colors hover:bg-gray-50 dark:hover:bg-neutral-900"
        onClick={handleClick}>
        <Avatar
          alt={song.name}
          src={song.album.images[0]?.url}
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
            {song.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {song.artists.map((artist) => artist.name).join(", ")}
          </Typography>
          <PopularityDots popularity={song.popularity} />
        </div>
      </Box>

      <SongModal song={song} open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
