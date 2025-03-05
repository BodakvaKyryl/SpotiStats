"use client"
import { useAuthContext } from "@/providers/auth";
import { handleAuthCallback } from "@/services/authCode";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import useSWRImmutable from "swr/immutable";

export const useLoginCallback = () => {
  const searchParams = useSearchParams();
  console.log(searchParams, "searchParams - login component");
  const code = searchParams.get("code");

  const { refreshUserToken } = useAuthContext();

  const processCallback = useCallback(async () => {
    console.log("before handleAuthCallback");

    const success = await handleAuthCallback();
    if (success) {
      console.log("before refreshUserToken");

      await refreshUserToken();
    }
  }, [refreshUserToken]);

  const { error, isLoading, isValidating, data } = useSWRImmutable("login-callback", code ? processCallback : null);

  console.log(data, "data - login component");

  return {
    isLoading: isLoading || isValidating,
    data,
    error,
  };
};
