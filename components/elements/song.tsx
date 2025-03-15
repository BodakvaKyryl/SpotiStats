import { ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";
import { Artist } from "@/types";

interface SongItemProps {
  id: string;
  name: string;
  artists: Artist[];
  albumImageUrl?: string;
}

export const SongItem = ({ id, name, artists, albumImageUrl }: SongItemProps) => (
  <ListItem key={id}>
    <ListItemAvatar>
      <Avatar alt={name} src={albumImageUrl} sx={{ width: 56, height: 56, marginRight: 2 }} variant="square" />
    </ListItemAvatar>
    <ListItemText primary={name} secondary={artists.map((artist) => artist.name).join(", ")} />
  </ListItem>
);
