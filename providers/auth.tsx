"use client";

import {
  getUserData,
  redirectToSpotifyAuthorize,
  refreshToken,
  logout as spotifyLogout,
  TokenManager
} from "@/services/authCode";
import type { SpotifyUserProfile } from "@/types";
import { redirect, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, type PropsWithChildren } from "react";
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
  const router = useRouter();

  const {data: user, error, isLoading, mutate } = useSWRImmutable(
    "user-profile" ,
    async () => {
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
    },
    // {
    //   revalidateOnMount:
    // }
  )

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
      // await mutate();
    } catch (error) {
      console.error("Failed to refresh token", error);
      throw error;
    }
  };

  const isAuthenticated =   (TokenManager.isLoggedIn() && !!user) 

  //

  useEffect(() => {
    if (  TokenManager.isLoggedIn() && !user && !isLoading) {
      // mutate();
    }
  }, [user, isLoading,  ])

  if (isLoading  ){
    return <div>Loading user data...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: isLoading,
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
