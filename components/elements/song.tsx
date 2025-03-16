import { ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Box } from "@mui/material";
import { formatDuration } from "@/utils/format";
import { SongItemProps } from "@/types/song.type";

export const SongItem = ({ song }: SongItemProps) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar
        alt={song.name}
        src={song.album.images[0]?.url}
        sx={{ width: 56, height: 56, marginRight: 2 }}
        variant="square"
      />
    </ListItemAvatar>
    <ListItemText
      primary={
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography component="span">{song.name}</Typography>
          <Typography component="span" variant="body2" color="text.secondary">
            {formatDuration(song.duration_ms)}
          </Typography>
        </Box>
      }
      secondary={song.artists.map((artist) => artist.name).join(", ")}
    />
  </ListItem>
);
