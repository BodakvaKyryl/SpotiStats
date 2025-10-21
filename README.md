# SpotiStats - Your Personal Spotify Dashboard

SpotiStats is a web application built with Next.js that allows you to connect your Spotify account and visualize your personal listening statistics. Get insights into your favorite artists, songs, and genres over different time periods.

## Features

- **Authentication:** Securely log in with your Spotify account using NextAuth.js.
- **Personalized Dashboard:** View your top artists, top tracks, and recently played songs all in one place.
- **Top Artists:** Discover which artists you've listened to the most.
- **Top Songs:** See a list of your most-played tracks.
- **Top Albums:** Browse through your favorite albums.
- **Genre Insights:** Explore the genres that dominate your listening habits.
- **Now Playing:** See what's currently playing on your Spotify account in real-time.
- **Responsive Design:** A clean and modern UI that works on all devices.

## Important Note: Development Mode

This application is currently in "Development Mode" as per Spotify's Web API policies. This means that only a limited number of users, who have been manually added to the user list in the Spotify Developer Dashboard, will be able to log in and use the application.

If you would like to use this application, please contact the developer to be added to the user list.

## Screenshots

Here are some screenshots of the application in action.

**Home Dashboard**
_![Home Dashboard](/images/home-dashboard.png)_

> The main dashboard showing an overview of your listening stats, including currently playing, recently played, and top items.

**Artists Page**
_![Artists Page](/images/artists-page.png)_

> A dedicated page to view your top artists.

**Songs Page**
_![Songs Page](/images/songs-page.png)_

> A dedicated page to view your top songs.

**Albums Page**
_![Albums Page](/images/albums-page.png)_

> Browse through your most-listened-to albums.

**Genres Page**
_![Genres Page](/images/genres-page.png)_

> Explore the genres that dominate your listening habits.

**Item Details**
_![Item Details](/images/item-details.png)_

> View detailed statistics for a specific artist, song, or album.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), [Material-UI](https://mui.com/)
- **API:** [Spotify Web API](https://developer.spotify.com/documentation/web-api)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later recommended)
- Yarn, npm, or pnpm

### Installation

**Set up environment variables:**

You'll need to create a `.env.local` file in the root of the project and add your Spotify application credentials. You can get these by creating an app on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
NEXTAUTH_SECRET=your_nextauth_secret # Generate a random string for this
NEXTAUTH_URL=http://localhost:3000
```

_Note: Make sure to add `http://localhost:3000/api/auth/callback/spotify` to the Redirect URIs in your Spotify app settings._
