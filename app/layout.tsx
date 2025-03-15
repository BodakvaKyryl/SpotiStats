"use client";

import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { red } from "@mui/material/colors";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PropsWithChildren } from "react";
import NextAuthProvider from "@/providers/nextAuthProvider";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#1db954" },
    secondary: { main: "#1db954" },
    error: { main: red.A400 },
  },
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline enableColorScheme />
          <NextAuthProvider> {children} </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
