"use client";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { alpha, Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { ReactNode, useRef } from "react";

interface HorizontalScrollProps {
  children: ReactNode;
}

export const HorizontalScroll = ({ children }: HorizontalScrollProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      const scrollAmount = Math.max(containerWidth * 0.7, 300);
      const newScrollLeft =
        direction === "left"
          ? Math.max(0, scrollContainerRef.current.scrollLeft - scrollAmount)
          : Math.min(
              scrollContainerRef.current.scrollWidth - containerWidth,
              scrollContainerRef.current.scrollLeft + scrollAmount
            );

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };
  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      {isDesktop && (
        <>
          <Box
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "60px",
              background: (theme) =>
                `linear-gradient(to right, ${theme.palette.background.paper}CC, ${theme.palette.background.paper}00)`,
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          <IconButton
            onClick={() => scroll("left")}
            sx={{
              position: "absolute",
              left: { xs: "8px", md: "10px" },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.7),
              backdropFilter: "blur(10px)",
              border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              "&:hover": {
                backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.9),
              },
            }}>
            <ChevronLeftIcon />
          </IconButton>
        </>
      )}
      {isDesktop && (
        <>
          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "60px",
              background: (theme) =>
                `linear-gradient(to left, ${theme.palette.background.paper}CC, ${theme.palette.background.paper}00)`,
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          <IconButton
            onClick={() => scroll("right")}
            sx={{
              position: "absolute",
              right: { xs: "8px", md: "10px" },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.7),
              backdropFilter: "blur(10px)",
              border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              "&:hover": {
                backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.9),
              },
            }}>
            <ChevronRightIcon />
          </IconButton>
        </>
      )}
      <Box
        ref={scrollContainerRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          position: "relative",
          "&:hover": {
            "&::-webkit-scrollbar": {
              display: "block",
            },
            scrollbarWidth: "thin",
          },
          pt: 1,
          pb: 1,
          pl: { md: 2 },
        }}>
        {children}
      </Box>
    </Box>
  );
};
