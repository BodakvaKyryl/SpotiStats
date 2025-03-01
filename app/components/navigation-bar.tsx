import { getUserData, logout, redirectToSpotifyAuthorize, refreshToken, tokenManager } from "~/services/authCode";
import type { UserProfile } from "~/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleLoginClick = async (): Promise<void> => {
    try {
      await redirectToSpotifyAuthorize();
    } catch (error) {
      setError("Failed to initiate login process");
      console.error(error);
    }
  };

  const handleLogoutClick = (): void => {
    logout();
    setUserData(null);
  };

  useEffect((): void => {
    const fetchUserData = async (): Promise<void> => {
      try {
        setIsLoading(true);

        if (tokenManager.isLoggedIn()) {
          if (tokenManager.isExpired()) {
            const token = await refreshToken();
            tokenManager.save(token);
          }

          const profile = await getUserData();
          setUserData(profile);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Authentication error", error);
        setError("Failed to fetch user data");
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Spotify App</Link>
      </div>

      <div className="navbar-menu">
        <Link to="/browse">Browse</Link>
        <Link to="/playlists">Playlists</Link>
        {/* Add other navigation links as needed */}
      </div>

      <div className="navbar-auth">
        {isLoading ? (
          <div className="loading-indicator">Loading...</div>
        ) : error ? (
          <button onClick={handleLoginClick} className="login-button">
            Log In
          </button>
        ) : userData ? (
          <div className="user-profile">
            {userData.images && userData.images.length > 0 ? (
              <img src={userData.images[0].url} alt={userData.display_name} className="profile-thumbnail" />
            ) : (
              <div className="profile-placeholder">{userData.display_name?.charAt(0)}</div>
            )}
            <span className="user-name">{userData.display_name}</span>
            <button onClick={handleLogoutClick} className="logout-button">
              Log Out
            </button>
          </div>
        ) : (
          <button onClick={handleLoginClick} className="login-button">
            Log In
          </button>
        )}
      </div>
    </nav>
  );
};
