import { Box, Typography, Avatar } from "@mui/material";
import { ArtistItemProps } from "@/types";
import { PopularityDots } from "@/components";

export const TopArtistItem = ({ artist }: ArtistItemProps) => (
  <Box className="flex flex-col gap-2 p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900">
    <Avatar
      alt={artist.name}
      src={artist.images[0]?.url}
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
        {artist.name}
      </Typography>
      {artist.genres.length > 0 && (
        <Typography variant="caption" color="text.secondary" noWrap>
          {artist.genres.slice(0, 2).join(" • ")}
        </Typography>
      )}
      <PopularityDots popularity={artist.popularity} />
    </div>
  </Box>
);
