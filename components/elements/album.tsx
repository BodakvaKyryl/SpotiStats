import { AlbumItemProps } from "@/types";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export const AlbumItem = ({ album, position }: AlbumItemProps) => (
  <Card
    elevation={4}
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      "&:hover": {
        bgcolor: "action.hover",
      },
    }}>
    {position && (
      <Typography
        variant="body2"
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          bgcolor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          width: 24,
          height: 24,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "medium",
        }}>
        {position}
      </Typography>
    )}
    <CardMedia
      component="img"
      image={album.images[0]?.url}
      alt={album.name}
      sx={{
        aspectRatio: "1",
        objectFit: "cover",
      }}
    />
    <CardContent>
      <Typography variant="subtitle1" component="div">
        {album.name}
      </Typography>
    </CardContent>
  </Card>
);
