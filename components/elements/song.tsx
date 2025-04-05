import { ListItem, ListItemAvatar, ListItemText, Avatar, Typography } from "@mui/material";
import { formatDuration } from "@/utils/format";
import { SongItemProps } from "@/types";
import { PopularityDots } from "./shared/popularity-dots";

export const SongItem = ({ song }: SongItemProps) => (
  <ListItem className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-900">
    <ListItemAvatar>
      <Avatar
        alt={song.name}
        src={song.album.images[0]?.url}
        variant="rounded"
        sx={{
          width: 56,
          height: 56,
          mr: 2,
        }}
      />
    </ListItemAvatar>
    <ListItemText
      primary={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Typography variant="subtitle1" component="span">
              {song.name}
            </Typography>
          </div>

          <div className="flex flex-col items-end gap-1">
            <Typography variant="body2" color="text.secondary">
              {formatDuration(song.duration_ms)}
            </Typography>
            <PopularityDots popularity={song.popularity} />
          </div>
        </div>
      }
      secondary={
        <Typography variant="body2" color="text.secondary">
          {song.artists.map((artist) => artist.name).join(", ")}
        </Typography>
      }
    />
  </ListItem>
);
