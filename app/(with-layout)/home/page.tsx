"use client";

import { CurrentlyPlaying, ProtectedLayout, RecentlyPlayed, TopAlbums, TopArtists, TopSongs } from "@/components";

export default function Home() {
  return (
    <ProtectedLayout>
      <div className="container mx-auto max-w-7xl sm:px-1.25 md:px-4">
        <div className="flex flex-col space-y-8">
          <TopSongs />
          <TopAlbums />
          <TopArtists />
          <CurrentlyPlaying />
          <RecentlyPlayed />
        </div>
      </div>
    </ProtectedLayout>
  );
}
