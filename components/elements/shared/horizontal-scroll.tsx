import { Box } from "@mui/material";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

export const HorizontalScroll = ({ children, className }: HorizontalScrollProps) => (
  <Box
    className={`scrollbar-hide overflow-x-auto ${className || ""}`}
    sx={{
      "&::-webkit-scrollbar": {
        display: "none",
      },
      "-ms-overflow-style": "none",
      "scrollbar-width": "none",
    }}>
    <div className="flex space-x-4 pb-4">{children}</div>
  </Box>
);
