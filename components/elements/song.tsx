import { ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";
import { formatDuration } from "@/utils/format";
import { SongItemProps } from "@/types";

export const SongItem = ({ song }: SongItemProps) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar alt={song.name} src={song.album.images[0]?.url} className="w-14 h-14 mr-4" variant="square" />
    </ListItemAvatar>
    <ListItemText
      primary={
        <div className="flex justify-between items-center">
          <span>{song.name}</span>
          <span className="text-sm text-gray-300">{formatDuration(song.duration_ms)}</span>
        </div>
      }
      secondary={song.artists.map((artist) => artist.name).join(", ")}
    />
  </ListItem>
);
