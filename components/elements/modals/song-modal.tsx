import { Modal, Box, Typography, IconButton, Chip, Divider, Fade } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExplicitIcon from "@mui/icons-material/Explicit";
import { SpotifySong } from "@/types";
import { formatDuration, formatDate } from "@/utils/format";
import { PopularityDots, SpotifyLinkButton } from "@/components";
import { useSpotifyEmbed } from "@/hooks/useSpotifyEmbed";
import Image from "next/image";

interface SongModalProps {
  song: SpotifySong;
  open: boolean;
  onClose: () => void;
}

export const SongModal = ({ song, open, onClose }: SongModalProps) => {
  const { embedHtml, isLoading } = useSpotifyEmbed(song.external_urls.spotify);

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      aria-labelledby="song-modal-title"
      className="flex items-center justify-center p-4">
      <Fade in={open} timeout={300}>
        <Box
          className="relative max-h-[90vh] w-full overflow-y-auto rounded-lg bg-white dark:bg-neutral-900"
          sx={{
            outline: "none",
            maxWidth: { xs: "100%", sm: "520px", md: "720px" },
            p: { xs: 2, sm: 4, md: 6 },
            transform: "scale(1)",
            transition: "transform 0.3s ease-in-out",
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
            <div
              className="relative mx-auto sm:mx-0"
              style={{
                width: "min(100%, 192px)",
                height: "min(100vw, 192px)",
              }}>
              <Image
                src={song.album.images[0]?.url || "/fallback.jpg"}
                alt={song.name}
                fill
                className="rounded-lg object-cover"
                sizes="(max-width: 640px) 100vw, 192px"
              />
            </div>

            <Box className="flex flex-grow flex-col gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    sx={{
                      fontSize: { xs: "1.25rem", sm: "1.5rem" },
                    }}>
                    {song.name}
                  </Typography>
                  {song.explicit && <ExplicitIcon fontSize="small" className="text-gray-400" />}
                </div>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  }}>
                  {song.artists.map((artist) => artist.name).join(", ")}
                </Typography>
              </div>

              <Divider />

              <Box
                className="gap-4"
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                }}>
                <div>
                  <Typography variant="caption" color="text.secondary">
                    Album
                  </Typography>
                  <Typography variant="body2">{song.album.name}</Typography>
                </div>
                <div>
                  <Typography variant="caption" color="text.secondary">
                    Release Date
                  </Typography>
                  <Typography variant="body2">{formatDate(song.album.release_date)}</Typography>
                </div>
                <div>
                  <Typography variant="caption" color="text.secondary">
                    Duration
                  </Typography>
                  <Typography variant="body2">{formatDuration(song.duration_ms)}</Typography>
                </div>
                <div>
                  <Typography variant="caption" color="text.secondary">
                    Track in album
                  </Typography>
                  <Typography variant="body2">
                    {song.track_number} of {song.album.total_tracks}
                  </Typography>
                </div>
              </Box>

              <Divider />

              {!isLoading && embedHtml && (
                <Box className="overflow-hidden rounded-lg" dangerouslySetInnerHTML={{ __html: embedHtml }} />
              )}

              <Box className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <Typography variant="caption" color="text.secondary">
                    Popularity
                  </Typography>
                  <PopularityDots popularity={song.popularity} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {song.preview_url && (
                    <Chip
                      size="small"
                      color="primary"
                      label="Preview available"
                      sx={{
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      }}
                    />
                  )}
                  <SpotifyLinkButton href={song.external_urls.spotify}>Open in Spotify</SpotifyLinkButton>
                </div>
              </Box>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
