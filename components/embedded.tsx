import { Box, Fade } from "@mui/material";
import { Suspense } from "react";

type EmbeddedProps = {
  isLoading: boolean;
  html: string;
};

export const Embedded = ({ isLoading, html }: EmbeddedProps) => {
  return (
    <Suspense fallback={<div className="h-96 w-full animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />}>
      {!isLoading && html && (
        <Fade in timeout={1500}>
          <Box
            className="overflow-hidden rounded-lg"
            sx={{
              opacity: 1,
              transform: "translateY(0)",
              transition: "opacity 2s ease-in-out, transform 2s ease-in-out",
            }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Fade>
      )}
    </Suspense>
  );
};
