import { Box } from "@mui/material";
import { ReactNode } from "react";

interface HorizontalScrollProps {
  children: ReactNode;
}

export const HorizontalScroll = ({ children }: HorizontalScrollProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        scrollBehavior: "smooth",
        "&::-webkit-scrollbar": {
          height: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "4px",
          "&:hover": {
            background: "#555",
          },
        },

        msOverflowStyle: "none",
        scrollbarWidth: "none",
        "&:hover": {
          "&::-webkit-scrollbar": {
            display: "block",
          },
          scrollbarWidth: "thin",
        },
      }}>
      {children}
    </Box>
  );
};
