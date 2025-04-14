"use client";

import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { ReactNode } from "react";

interface ProtectedLayoutProps {
  children: ReactNode;
}

export const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const { isAuthenticated, isLoading } = useAuthRedirect();

  if (isLoading) {
    return (
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            gap: 2,
          }}>
          <CircularProgress />
          <Typography variant="body1">Loading...</Typography>
        </Box>
      </Container>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};
