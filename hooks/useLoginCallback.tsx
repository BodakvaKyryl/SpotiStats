"use client";

import { useAuthContext } from "@/providers/auth";
import { handleAuthCallback } from "@/services/authCode";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import useSWRImmutable from "swr/immutable";

export const useLoginCallback = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const { refreshUserToken } = useAuthContext();

  const processCallback = useCallback(async () => {
    if (!code) return null;

    const success = await handleAuthCallback();
    if (success) {
      await refreshUserToken();
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
