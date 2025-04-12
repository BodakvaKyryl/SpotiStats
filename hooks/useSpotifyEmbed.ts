"use client";
import { SpotifyService } from "@/services";
import useSWR from "swr";

export const useSpotifyEmbed = (url: string, shouldFetch?: boolean) => {
  const { data: { html: embedHtml } = { html: "" }, ...rest } = useSWR(
    shouldFetch ? url : null,
    async (url: string) => SpotifyService.getOEmbed(url),
    {
      revalidateOnFocus: false,
    }
  );

  return { embedHtml, ...rest };
};
