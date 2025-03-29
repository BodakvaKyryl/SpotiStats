import { Box, Card, CardContent, Typography, alpha, styled } from "@mui/material";
import Image from "next/image";
import { ArtistItemProps } from "@/types";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
  position: "relative",
  cursor: "pointer",
  transition: theme.transitions.create(["background-color", "box-shadow"]),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    "& .artist-image": {
      transform: "scale(1.05)",
    },
  },
}));

const PositionBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  left: theme.spacing(1),
  width: 24,
  height: 24,
  backgroundColor: alpha(theme.palette.common.black, 0.6),
  color: theme.palette.common.white,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: theme.typography.pxToRem(12),
  fontWeight: theme.typography.fontWeightMedium,
  zIndex: 1,
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  aspectRatio: "1",
  borderRadius: theme.shape.borderRadius * 2,
  overflow: "hidden",
  marginBottom: theme.spacing(2),
}));

export const ArtistCard = ({ artist, position, showGenres = true, onClick }: ArtistItemProps) => (
  <StyledCard elevation={0} variant="outlined" onClick={onClick}>
    {position && <PositionBadge>{position}</PositionBadge>}

    <ImageContainer>
      {artist.images[0]?.url ? (
        <Image
          src={artist.images[0].url}
          alt={artist.name}
          fill
          className="artist-image object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ transition: "transform 0.3s ease-in-out", borderRadius: "inherit" }}
          priority
        />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            bgcolor: "grey.200",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Typography variant="body2" color="text.secondary">
            No Image
          </Typography>
        </Box>
      )}
    </ImageContainer>

    <CardContent sx={{ textAlign: "center", p: 0, flexGrow: 1 }}>
      <Typography
        variant="subtitle1"
        component="h3"
        sx={{
          fontWeight: 600,
          mb: 0.5,
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
        }}>
        {artist.name}
      </Typography>
      {showGenres && artist.genres?.length > 0 && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: "small",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
          }}>
          {artist.genres.slice(0, 5).join(" • ")}
        </Typography>
      )}
    </CardContent>
  </StyledCard>
);
