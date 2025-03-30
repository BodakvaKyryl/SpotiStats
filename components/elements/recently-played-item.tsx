"use client";

import { ListItem, ListItemAvatar, Avatar, Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import { formatDuration } from "@/utils/format";
import { formatDistanceToNow } from "date-fns";
import type { RecentlyPlayedTrack } from "@/types/recently-played.type";

interface RecentlyPlayedItemProps {
  track: RecentlyPlayedTrack;
}

export const RecentlyPlayedItem = ({ track }: RecentlyPlayedItemProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const artistNames = track.track.artists.map((artist) => artist.name).join(", ");

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <ListItem className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-900">
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
            maxWidth: isMobile ? "90%" : "90%",
          }}>
          <Typography
            variant={isMobile ? "body1" : "subtitle1"}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontWeight: 500,
            }}>
            {truncateText(track.track.name, isMobile ? 25 : 40)}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}>
            {truncateText(artistNames, isMobile ? 20 : 35)}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            flexShrink: 0,
            display: isMobile ? "none" : "block",
          }}>
          {formatDuration(track.track.duration_ms)}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            flexShrink: 0,
            minWidth: isMobile ? "70px" : "90px",
            textAlign: "right",
          }}>
          {formatDistanceToNow(new Date(track.played_at), { addSuffix: true })}
        </Typography>
      </Box>
    </ListItem>
  );
};
