import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, Typography } from "@mui/material";

export const TimeDisplay = ({ timestamp }: { timestamp: Date }) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);

  if (diffInSeconds < 60) return "1m";

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return `${minutes}m`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo`;

  const years = Math.floor(days / 365);
  return `${years}y`;
};

export const CompactTimeDisplay = ({ date }: { date: Date }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        height: "20px",
      }}>
      <AccessTimeIcon
        sx={{
          fontSize: "0.875rem",
          opacity: 0.4,
          mt: "1px",
          display: "block",
        }}
      />
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          lineHeight: "20px",
          display: "block",
          minWidth: "26px",
        }}>
        {TimeDisplay({ timestamp: date })}
      </Typography>
    </Box>
  );
};
