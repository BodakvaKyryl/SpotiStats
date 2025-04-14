import { PopularityDots } from "@/components";
import { useAuthSWR } from "@/hooks/useSpotifyData";
import { useSpotifyEmbed } from "@/hooks/useSpotifyEmbed";
import { SpotifyService } from "@/services";
import { SpotifyAlbum } from "@/types";
import { formatDate } from "@/utils/format";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Chip, Divider, Fade, IconButton, Modal, Typography } from "@mui/material";

interface AlbumModalProps {
  album: SpotifyAlbum;
  open: boolean;
  onClose: () => void;
  embedded?: {
    html: string;
    isLoading: boolean;
  };
}

type ArtistsParams = {
  ids: string[];
};

type ArtistResponse = {
  artists: Array<{
    genres: string[];
  }>;
};

export const AlbumModal = ({ album, open, onClose }: AlbumModalProps) => {
  const { embedHtml, isLoading: isEmbedLoading } = useSpotifyEmbed(album.external_urls.spotify, open);

  const artistIds = album.artists.map((artist) => artist.id);

  const { data: artistsData } = useAuthSWR<typeof SpotifyService.getArtists, ArtistsParams>(
    artistIds.length > 0 ? SpotifyService.getArtists : null,
    artistIds.length > 0 ? { ids: artistIds } : null,
    { revalidateOnFocus: false, revalidateIfStale: false }
  );

  const genres = Array.from(new Set((artistsData as ArtistResponse)?.artists?.flatMap((artist) => artist.genres) || []))
    .filter((genre): genre is string => typeof genre === "string")
    .sort();

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      aria-labelledby="album-modal-title"
      className="flex items-center justify-center p-4">
      <Fade in={open} timeout={300}>
        <Box
          className="relative max-h-[90vh] w-full overflow-y-auto rounded-lg bg-white/70 backdrop-blur-md dark:bg-neutral-900/70"
          sx={{
            outline: "none",
            maxWidth: { xs: "100%", sm: "520px", md: "720px" },
            p: { xs: 2, sm: 4, md: 6 },
            transform: "scale(1)",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.0)",
            },
            animation: open ? "modalEnter 0.3s ease-out" : "none",
            "@keyframes modalEnter": {
              "0%": {
                opacity: 0,
                transform: "scale(0.75)",
              },
              "100%": {
                opacity: 1,
                transform: "scale(1)",
              },
            },
          }}>
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              right: { xs: 4, sm: 8 },
              top: { xs: 4, sm: 8 },
            }}>
            <CloseIcon />
          </IconButton>

          <Box
            className="flex flex-col gap-4"
            sx={{
              flexDirection: { xs: "column", sm: "row" },
            }}>
            <Box className="flex flex-grow flex-col gap-4">
              <div>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  sx={{
                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  }}>
                  {album.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  }}>
                  {album.artists.map((artist) => artist.name).join(", ")}
                </Typography>

                {genres.length > 0 && (
                  <Box className="mt-2 flex flex-wrap gap-2">
                    {genres.map((genre) => (
                      <Chip
                        key={genre}
                        label={genre}
                        size="medium"
                        color="primary"
                        variant="outlined"
                        sx={{
                          fontSize: { xs: "0.75rem", sm: "0.875rem" },
                          textTransform: "capitalize",
                        }}
                      />
                    ))}
                  </Box>
                )}
              </div>

              <Divider />

              <Box
                className="gap-4"
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
                }}>
                <div>
                  <Typography variant="caption" color="text.secondary">
                    Release Date
                  </Typography>
                  <Typography variant="body2">{formatDate(album.release_date)}</Typography>
                </div>
                <div>
                  <Typography variant="caption" color="text.secondary">
                    Total Tracks
                  </Typography>
                  <Typography variant="body2">{album.total_tracks}</Typography>
                </div>
                <div>
                  <Typography variant="caption" color="text.secondary">
                    Popularity
                  </Typography>
                  <PopularityDots popularity={album.popularity} />
                </div>
              </Box>

              <Divider />

              {!isEmbedLoading && embedHtml && (
                <Fade in timeout={1500}>
                  <Box
                    className="overflow-hidden rounded-lg"
                    sx={{
                      opacity: 1,
                      transform: "translateY(0)",
                      transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
                    }}
                    dangerouslySetInnerHTML={{ __html: embedHtml }}
                  />
                </Fade>
              )}
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
