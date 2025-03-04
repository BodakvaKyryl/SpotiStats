import {
  getUserData,
  redirectToSpotifyAuthorize,
  refreshToken,
  logout as spotifyLogout,
  tokenManager,
} from "~/services/authCode";
import type { SpotifyUserProfile } from "~/types";
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";

export type AuthUserData = {
  user: SpotifyUserProfile | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => void;
  refreshUserToken: () => Promise<void>;
};

const AuthContext = createContext<AuthUserData | null>(null);

export const useAuthContext = (): AuthUserData => {
  const userData = useContext(AuthContext);
  if (!userData) throw Error("No user data provided");

  return userData;
};

export type AuthProviderProps = {
  codeId?: string;
};

export function AuthProvider({ children }: PropsWithChildren<AuthProviderProps>) {
  const [user, setUser] = useState<SpotifyUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const login = async (): Promise<void> => {
    try {
      await redirectToSpotifyAuthorize();
    } catch (error) {
      setError("Failed to initiate login process");
      console.error(error);
    }
  };

  const logout = (): void => {
    spotifyLogout();
    setUser(null);
  };

  const refreshUserToken = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const token = await refreshToken();
      tokenManager.save(token);
      console.log("Token refreshed, fetching user data");

      const profile = await getUserData();
      console.log("User profile fetched:", !!profile);
      setUser(profile);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to refresh token", error);
      setError("Failed to refresh token");
      setIsLoading(false);
    }
  };

  // TODO: rewrite with swr
  // Initialize auth state on component mount
  useEffect(() => {
    const initializeAuth = async (): Promise<void> => {
      try {
        setIsLoading(true);

        if (tokenManager.isLoggedIn()) {
          if (tokenManager.isExpired()) {
            const token = await refreshToken();
            tokenManager.save(token);
          }

          const profile = await getUserData();
          setUser(profile);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Auth initialization error", error);
        setError("Failed to initialize authentication");
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const isAuthenticated = !!user && tokenManager.isLoggedIn();

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        isAuthenticated,
        login,
        logout,
        refreshUserToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
