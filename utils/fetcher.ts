import { Session } from "next-auth";

export const spotifyFetcher = (session: Session | null) => async (url: string) => {
  if (!session?.accessToken) {
    throw new Error("No access token");
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }

  return response.json();
};
