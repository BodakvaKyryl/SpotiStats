import { ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";
import { formatDuration } from "@/utils/format";
import { SongItemProps } from "@/types";

export const SongItem = ({ song }: SongItemProps) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar alt={song.name} src={song.album.images[0]?.url} className="mr-4 h-14 w-14" variant="square" />
    </ListItemAvatar>
    <ListItemText
      primary={
        <div className="flex items-center justify-between">
          <span>{song.name}</span>
          <span className="text-sm text-gray-300">{formatDuration(song.duration_ms)}</span>
        </div>
      }
      secondary={song.artists.map((artist) => artist.name).join(", ")}
    />
  </ListItem>
);
