import { useAuthContext } from "~/providers/auth";
import { handleAuthCallback } from "~/services/authCode";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export const useLoginCallback = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  console.log(searchParams, "searchParams - login component");

  const { refreshUserToken } = useAuthContext();

  const processCallback = useCallback(async (code: string) => {
    if (code) {
      setIsLoading(true);
      try {
        console.log("before handleAuthCallback");

        const success = await handleAuthCallback();
        if (success) {
          console.log("before refreshUserToken");

          await refreshUserToken();

          // setTimeout(() => {
          //   navigate("/home", { replace: true });
          // }, 500);
        }
      } catch (err) {
        console.error("Authentication callback error", err);
        setErrors("Failed to complete authentication");
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const code = searchParams.get("code");
    console.log(code, "code - login component");

    processCallback(code);
  }, [searchParams, refreshUserToken]);

  return {
    isLoading,
    errors,
  };
};
