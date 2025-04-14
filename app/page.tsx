"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (session?.accessToken) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, [router, session, status]);

  return (
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
      <Typography variant="body1">Redirecting...</Typography>
    </Box>
  );
}
