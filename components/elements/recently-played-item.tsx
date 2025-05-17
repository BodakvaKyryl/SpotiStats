"use client";

import { useSpotifyEmbed } from "@/hooks/useSpotifyEmbed";
import type { RecentlyPlayedTrack } from "@/types/recently-played.type";
import { formatDuration } from "@/utils/format";
import { Avatar, Box, ListItem, ListItemAvatar, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { SongModal } from "./modals/song-modal";
import { CompactTimeDisplay } from "./shared/time-display";

interface RecentlyPlayedItemProps {
  track?: RecentlyPlayedTrack;
  isLoading?: boolean;
}

export const RecentlyPlayedItem = ({ track, isLoading = false }: RecentlyPlayedItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { embedHtml, isLoading: isEmbedHtmlLoading } = useSpotifyEmbed(track?.track.external_urls.spotify, isModalOpen);

  const handleClick = () => {
    if (isLoading) return;
    setIsModalOpen(true);
  };

  if (isLoading || !track) {
    return (
      <ListItem className="transition-colors">
        <ListItemAvatar>
          <Skeleton variant="rectangular" width={56} height={56} className="rounded-md" />
        </ListItemAvatar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: isMobile ? 1 : 2,
          }}>
          <Box
            sx={{
              flexGrow: 1,
              minWidth: 0,
              maxWidth: isMobile ? "90%" : "90%",
            }}>
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="text" width="40%" height={20} />
          </Box>
          <Skeleton variant="text" width={60} sx={{ display: isMobile ? "none" : "block" }} />
          <Skeleton variant="text" width={70} />
        </Box>
      </ListItem>
    );
  }

  const artistNames = track.track.artists.map((artist) => artist.name).join(", ");
  const truncateText = (text: string, maxLength: number) => {
    const effectiveMaxLength = Math.floor(maxLength * 0.85);
    return text.length > effectiveMaxLength ? `${text.substring(0, effectiveMaxLength)}...` : text;
  };

  return (
    <>
      <ListItem
        className="cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-neutral-900"
        onClick={handleClick}>
        <ListItemAvatar>
          <Avatar
            alt={track.track.name}
            src={track.track.album.images[0]?.url}
            variant="rounded"
            sx={{
              width: isMobile ? 48 : 56,
              height: isMobile ? 48 : 56,
              mr: 2,
            }}
          />
        </ListItemAvatar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: isMobile ? 1 : 2,
          }}>
          <Box
            sx={{
              flexGrow: 1,
              minWidth: 0,
              maxWidth: isMobile ? "calc(100% - 55px)" : "calc(100% - 160px)",
            }}>
            <Typography
              variant={isMobile ? "body2" : "subtitle1"}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontWeight: 500,
              }}>
              {truncateText(track.track.name, isMobile ? 31 : 40)}
            </Typography>
            <Typography
              variant={isMobile ? "caption" : "body2"}
              color="text.secondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}>
              {truncateText(artistNames, isMobile ? 31 : 35)}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              flexShrink: 0,
              display: isMobile ? "none" : "block",
              width: "70px",
              textAlign: "right",
            }}>
            {formatDuration(track.track.duration_ms)}
          </Typography>{" "}
          <Box
            sx={{
              flexShrink: 0,
              display: "flex",
              justifyContent: { xs: "flex-end", md: "flex-start" },
              minWidth: { xs: "45px", md: "auto" },
            }}>
            <CompactTimeDisplay date={new Date(track.played_at)} />
          </Box>
        </Box>
      </ListItem>

      <SongModal
        song={track.track}
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
