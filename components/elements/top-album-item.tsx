import { Box, Typography, Avatar } from "@mui/material";
import { AlbumItemProps } from "@/types";
import { PopularityDots } from "@/components";

export const TopAlbumItem = ({ album }: AlbumItemProps) => (
  <Box className="flex flex-col gap-2 p-2 transition-colors hover:bg-gray-50 dark:hover:bg-neutral-900">
    <Avatar
      alt={album.name}
      src={album.images[0]?.url}
      variant="rounded"
      sx={{
        width: "100%",
        height: "auto",
        aspectRatio: "1/1",
        borderRadius: "8px",
      }}
    />
    <div className="flex flex-col">
      <Typography variant="subtitle2" noWrap sx={{ fontWeight: 600 }}>
        {album.name}
      </Typography>
      <Typography variant="caption" color="text.secondary" noWrap>
        {album.artists.map((artist) => artist.name).join(", ")}
      </Typography>
      {album.popularity && <PopularityDots popularity={album.popularity} />}
    </div>
  </Box>
);
