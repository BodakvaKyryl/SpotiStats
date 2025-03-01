import type React from "react";
import { useEffect, useState, type JSX } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  getUserData,
  handleAuthCallback,
  logout,
  redirectToSpotifyAuthorize,
  refreshToken,
  tokenManager,
} from "~/services/authCode";

const SpotifyLoginPage: React.FC = (): JSX.Element => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const formatExpirationDate = (): string => {
    const expires = tokenManager.expires;
    if (!expires) return "Not available";

    return new Date(expires).toLocaleString();
  };

  const handleLoginClick = async (): Promise<void> => {
    try {
      await redirectToSpotifyAuthorize();
    } catch (error) {
      setError("Failed to initiate login process");
      console.error(error);
    }
  };

  const handleRefreshTokenClick = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const token = await refreshToken();
      tokenManager.save(token);
      setIsLoading(false);
    } catch (error) {
      setError("Failed to refresh token");
      console.error(error);
    }
  };

  const handleLogoutClick = (): void => {
    logout();
    setUserData(null);
  };

  // Process auth callback and fetch user data on component mount
  useEffect((): void => {
    const initialize = async (): Promise<void> => {
      try {
        setIsLoading(true);
        if (searchParams.has("code")) {
          const success = await handleAuthCallback();
          if (success) navigate("./login.tsx", { replace: true });
        }
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
        console.error("Initialization error", error);
        setError("Failed to initialize authentication");
        setIsLoading(false);
      }
    };
    initialize();
  }, [searchParams, navigate]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <h1>Authentication Error</h1>
        <p>{error}</p>
        <button onClick={handleLoginClick}>Try Again</button>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="login-container">
        <button id="login-button" onClick={handleLoginClick} className="login-button">
          Log in with Spotify
        </button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-main">
        <h1>Logged in as {userData.display_name}</h1>

        {userData.images && userData.images.length > 0 && (
          <img width="150" src={userData.images[0].url} alt={userData.display_name} className="profile-image" />
        )}

        <table className="profile-table">
          <tbody>
            <tr>
              <td>Display name</td>
              <td>{userData.display_name}</td>
            </tr>
            <tr>
              <td>Id</td>
              <td>{userData.id}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{userData.email}</td>
            </tr>
            <tr>
              <td>Spotify URI</td>
              <td>
                <a href={userData.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                  {userData.external_urls.spotify}
                </a>
              </td>
            </tr>
            <tr>
              <td>Link</td>
              <td>
                <a href={userData.href} target="_blank" rel="noopener noreferrer">
                  {userData.href}
                </a>
              </td>
            </tr>
            {userData.images && userData.images.length > 0 && (
              <tr>
                <td>Profile Image</td>
                <td>
                  <a href={userData.images[0].url} target="_blank" rel="noopener noreferrer">
                    {userData.images[0].url}
                  </a>
                </td>
              </tr>
            )}
            <tr>
              <td>Country</td>
              <td>{userData.country}</td>
            </tr>
          </tbody>
        </table>

        <div className="button-group">
          <button onClick={handleRefreshTokenClick}>Refresh Token</button>
          <button onClick={handleLogoutClick}>Log out</button>
        </div>
      </div>

      <div className="oauth-info">
        <h2>OAuth Info</h2>
        <table className="oauth-table">
          <tbody>
            <tr>
              <td>Access token</td>
              <td className="token-cell">{tokenManager.accessToken}</td>
            </tr>
            <tr>
              <td>Refresh token</td>
              <td className="token-cell">{tokenManager.refreshToken}</td>
            </tr>
            <tr>
              <td>Expiration at</td>
              <td>{formatExpirationDate()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpotifyLoginPage;
