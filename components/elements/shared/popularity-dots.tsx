import { Box, Tooltip, Typography } from "@mui/material";

interface PopularityDotsProps {
  popularity: number;
}

export const PopularityDots = ({ popularity }: PopularityDotsProps) => {
  const dots = Array.from({ length: 5 }, (_, i) => {
    const isActive = popularity >= (i + 1) * 20;
    return (
      <Box
        key={i}
        className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-green-500" : "bg-gray-300 dark:bg-gray-700"}`}
      />
    );
  });
  return (
    <Tooltip title={`Popularity: ${popularity}%`} arrow placement="top">
      <div className="mt-0.5 flex cursor-help items-center gap-2">
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>
          {popularity}%
        </Typography>
        <div className="flex gap-1">{dots}</div>
      </div>
    </Tooltip>
  );
};
