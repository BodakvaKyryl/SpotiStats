"use client";

import { CurrentlyPlaying, RecentlyPlayed, TopArtists, TopSongs } from "@/components";

export default function Home() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <div className="flex flex-col space-y-8">
        <TopSongs />
        <TopArtists />
        <CurrentlyPlaying />
        <RecentlyPlayed />
      </div>
    </div>
  );
}
