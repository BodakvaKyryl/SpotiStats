"use client";

import { Box, Card, Typography, alpha, styled } from "@mui/material";
import Image from "next/image";

export const StyledCard = styled(Card)(({ theme }) => ({
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
    "& img": {
      transform: "scale(1.05)",
    },
  },
}));

export const PositionBadge = styled(Box)(({ theme }) => ({
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

export const ImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  aspectRatio: "1",
  borderRadius: theme.shape.borderRadius * 2,
  overflow: "hidden",
  marginBottom: theme.spacing(2),
}));

interface MediaImageProps {
  src?: string;
  alt: string;
  className?: string;
}

export const MediaImage = ({ src, alt, className = "media-image" }: MediaImageProps) => (
  <>
    {src ? (
      <Image
        src={src}
        alt={alt}
        fill
        className={`${className} object-cover`}
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
  </>
);
