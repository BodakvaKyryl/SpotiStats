"use client";

import { useAuthContext } from "@/providers/auth";
import { handleAuthCallback } from "@/services/authCode";
import { redirect, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import useSWRImmutable from "swr/immutable";

export const useLoginCallback = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const { refreshUserToken } = useAuthContext();

  const processCallback = useCallback(async () => {
    if (!code) {
      console.log("No code found in params");
      return null;
    }

    console.log("Processing auth callback with code:", code);
    const success = await handleAuthCallback();
    console.log("Auth callback result:", success);

    if (success) {
      console.log("Auth successful, refreshing user token");
      await refreshUserToken();
      console.log("User token refreshed, redirecting to home");

      setTimeout(() => {
        redirect("/home");
      }, 7000);

      return true;
    }

    return false;
  }, [code, refreshUserToken]);

  const { error, isLoading, isValidating, data } = useSWRImmutable(code ? "login-callback" : null, processCallback);

  return {
    isLoading: isLoading || isValidating,
    data,
    error,
  };
};
