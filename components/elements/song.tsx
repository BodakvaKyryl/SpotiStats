import { ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";
import { SpotifyTrack } from "@/types/track.type";

interface SongItemProps {
  song: SpotifyTrack;
}

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
    <ListItemText primary={song.name} secondary={song.artists.map((artist) => artist.name).join(", ")} />
  </ListItem>
);
