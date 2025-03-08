"use client";

import { useAuthContext } from "@/providers/auth";
import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, type PropsWithChildren } from "react";

export const AuthGuard = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
