import { ListItem, ListItemAvatar, ListItemText, Avatar, Typography } from "@mui/material";
import { formatDuration } from "@/utils/format";
import { SongItemProps } from "@/types";

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

          <Typography variant="body2" color="text.secondary">
            {formatDuration(song.duration_ms)}
          </Typography>
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
