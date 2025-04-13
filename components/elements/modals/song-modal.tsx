import { Modal, Box, Typography, IconButton, Chip, Divider, Fade } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExplicitIcon from "@mui/icons-material/Explicit";
import { SpotifySong } from "@/types";
import { formatDuration, formatDate } from "@/utils/format";
import { PopularityDots, SpotifyLinkButton } from "@/components";
import { Embedded } from "@/components/embedded";

interface SongModalProps {
  song: SpotifySong;
  open: boolean;
  onClose: () => void;
  embedded?: {
    html: string;
    isLoading: boolean;
  };
}

export const SongModal = ({ song, open, onClose, embedded }: SongModalProps) => {
  console.log("embedded", !!embedded);

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      aria-labelledby="song-modal-title"
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

              {embedded && <Embedded isLoading={embedded.isLoading} html={embedded.html} />}

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
