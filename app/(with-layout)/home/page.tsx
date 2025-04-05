"use client";

import { CurrentlyPlaying, RecentlyPlayed, TopSongs } from "@/components";

export default function Home() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <div className="flex flex-col space-y-8">
        <TopSongs />
        <CurrentlyPlaying />
        <RecentlyPlayed />
      </div>
    </div>
  );
}
