"use client";

import {
  getUserData,
  redirectToSpotifyAuthorize,
  refreshToken,
  logout as spotifyLogout,
  TokenManager,
} from "@/services/authCode";
import type { SpotifyUserProfile } from "@/types";
import { redirect } from "next/navigation";
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import useSWRImmutable from "swr/immutable";

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
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWRImmutable(TokenManager.isLoggedIn() ? "user-profile" : null, async () => {
    if (TokenManager.isLoggedIn() && TokenManager.isExpired()) {
      try {
        const token = await refreshToken();
        TokenManager.save(token);
      } catch (error) {
        console.error("Token refresh failed:", error);
        TokenManager.clear();
        return null;
      }
    }
    return getUserData();
  });

  const login = async (): Promise<void> => {
    try {
      await redirectToSpotifyAuthorize();
    } catch (error) {
      console.error("Failed to initiate login process", error);
      throw error;
    }
  };

  const logout = (): void => {
    spotifyLogout();
    mutate(null, { revalidate: false });
    redirect("/login");
  };

  const refreshUserToken = async (): Promise<void> => {
    try {
      const token = await refreshToken();
      TokenManager.save(token);
      await mutate(undefined, { revalidate: true });
      console.log("User data refreshed, authenticated:", !!user);
    } catch (error) {
      console.error("Failed to refresh token", error);
      throw error;
    }
  };

  const isAuthenticated = TokenManager.isLoggedIn() && !!user;

  console.log("Auth state:", {
    tokenExists: TokenManager.isLoggedIn(),
    userExists: !!user,
    isAuthenticated,
  });

  useEffect(() => {
    if (!initialCheckDone) {
      const path = window.location.pathname;

      if (path !== "/login" && path !== "/callback") {
        if (!TokenManager.isLoggedIn()) {
          redirect("/login");
        } else if (!user && !isLoading) {
          mutate();
        }
      } else if (path === "/login" && TokenManager.isLoggedIn() && user) {
        redirect("/home");
      }

      setInitialCheckDone(true);
    }
  }, [user, isLoading, initialCheckDone, mutate]);

  useEffect(() => {
    if (!initialCheckDone) {
      const path = window.location.pathname;
      console.log("Initial auth check, path:", path);
      setInitialCheckDone(true);
    }
  }, [initialCheckDone]);

  if (isLoading && !initialCheckDone) {
    return <div>Loading user data...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error: error ? "Failed to fetch user data" : null,
        isAuthenticated,
        login,
        logout,
        refreshUserToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
