import { useAuthContext } from "~/providers";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Home() {
  const { isAuthenticated, user, isLoading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Welcome, {user?.display_name}!</h1>
      <div className="rounded-lg bg-green-100 p-6 shadow">
        <p className="text-lg">You are successfully logged in with Spotify.</p>
        <p className="mt-2 text-gray-700">
          You can now explore your Spotify stats and playlists using the navigation links above.
        </p>
      </div>
    </div>
  );
}
