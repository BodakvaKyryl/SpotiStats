import { Box } from "@mui/material";
import { Suspense } from "react";

type EmbeddedProps = {
  isLoading: boolean;
  html: string;
};

export const Embedded = ({ isLoading, html }: EmbeddedProps) => {
  return (
    <Suspense fallback={<div className="h-96 w-full animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />}>
      {!isLoading && <Box className="overflow-hidden rounded-lg" dangerouslySetInnerHTML={{ __html: html }} />}
    </Suspense>
  );
};
