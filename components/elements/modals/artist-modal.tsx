import { PopularityDots, SpotifyLinkButton } from "@/components";
import { useSpotifyEmbed } from "@/hooks/useSpotifyEmbed";
import { SpotifyArtist } from "@/types";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Chip, Divider, Fade, IconButton, Modal, Typography } from "@mui/material";

interface ArtistModalProps {
  artist: SpotifyArtist;
  open: boolean;
  onClose: () => void;
}

export const ArtistModal = ({ artist, open, onClose }: ArtistModalProps) => {
  const { embedHtml, isLoading } = useSpotifyEmbed(artist.external_urls.spotify, open);

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      aria-labelledby="artist-modal-title"
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
                  {artist.name}
                </Typography>

                <Box className="mt-2 flex flex-wrap gap-2">
                  {artist.genres.map((genre) => (
                    <Chip
                      key={genre}
                      label={genre}
                      color="primary"
                      size="medium"
                      variant="outlined"
                      sx={{
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      }}
                    />
                  ))}
                </Box>
              </div>

              <Divider />

              {!isLoading && embedHtml && (
                <Fade in timeout={1500}>
                  <Box
                    className="overflow-hidden rounded-lg"
                    sx={{
                      opacity: 1,
                      transform: "translateY(0)",
                      transition: "opacity 2s ease-in-out, transform 2s ease-in-out",
                    }}
                    dangerouslySetInnerHTML={{ __html: embedHtml }}
                  />
                </Fade>
              )}

              <Box className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <Typography variant="caption" color="text.secondary">
                    Popularity
                  </Typography>
                  <PopularityDots popularity={artist.popularity} />
                </div>
                <SpotifyLinkButton href={artist.external_urls.spotify}>Open in Spotify</SpotifyLinkButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
