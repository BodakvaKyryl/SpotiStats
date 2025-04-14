"use client";

import { Box, Typography } from "@mui/material";

interface ErrorContainerProps {
  message: string;
}

export const ErrorContainer = ({ message }: ErrorContainerProps) => {
  return (
    <Box className="flex min-h-[200px] w-full flex-col items-center justify-center rounded-md border border-neutral-200 bg-white px-4 py-8 dark:border-neutral-800 dark:bg-neutral-900">
      <Typography variant="h6" component="h2" className="mb-2 text-center">
        {message}
      </Typography>
      <Typography variant="body2" color="text.secondary" className="text-center">
        Please try again later
      </Typography>
    </Box>
  );
};
