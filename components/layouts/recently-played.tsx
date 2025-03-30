import { Paper, Box } from "@mui/material";
import { useRecentlyPlayed } from "@/hooks/useSpotifyData";
import { ProcessImage, ErrorContainer } from "@/components";
import { RecentlyPlayedItem } from "../elements/recently-played-item";

export const RecentlyPlayed = () => {
  const { data, error, isLoading } = useRecentlyPlayed("50");

  if (isLoading) return <ProcessImage />;
  if (error) return <ErrorContainer message="Failed to load recently played tracks" />;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Recently played</h1>
      </div>
      <Paper elevation={0} variant="outlined" className="bg-background overflow-hidden rounded-md">
        <div>
          {data?.items?.map((item) => (
            <Box
              key={`${item.track.id}-${item.played_at}`}
              sx={{
                "&:not(:last-child)": {
                  borderBottom: 1,
                  borderColor: "divider",
                },
              }}>
              <RecentlyPlayedItem track={item} />
            </Box>
          ))}
        </div>
      </Paper>
    </>
  );
};
