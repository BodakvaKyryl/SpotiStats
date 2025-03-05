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
import { createContext, useContext, useEffect, type PropsWithChildren } from "react";
// import  { type PropsWithChildren } from "react";
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
  const isClient = typeof window !== "undefined";

  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWRImmutable(
    isClient && TokenManager.isLoggedIn() ? "user-profile" : null,
    async () => {
      if (isClient && TokenManager.isExpired()) {
        const token = await refreshToken();
        TokenManager.save(token);
      }
      return getUserData();
    },
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      errorRetryCount: 3,
      fallbackData: null,
      onError: (err) => {
        console.error("Failed to fetch user data", err);
        if (isClient) {
          TokenManager.clear();
        }
      },
    }
  );

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
    redirect("/");
  };

  const refreshUserToken = async (): Promise<void> => {
    try {
      const token = await refreshToken();
      TokenManager.save(token);
      await mutate();
    } catch (error) {
      console.error("Failed to refresh token", error);
      throw error;
    }
  };

  const isAuthenticated = isClient && TokenManager.isLoggedIn() && !!user;

  useEffect(() => {
    if (TokenManager.isLoggedIn() && !user && !isLoading) {
      mutate();
    }
  }, [user, isLoading, mutate]);

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: isLoading || !isClient,
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
