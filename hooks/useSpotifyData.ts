"use client";

import { useSession } from "next-auth/react";
import { useMemo } from "react";
import useSWR, { SWRConfiguration } from "swr";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAuthSWR = <T extends (...args: any[]) => unknown, ParamT = Parameters<T>[1]>(
  fetcher: T | null,
  params: ParamT | null,
  options?: SWRConfiguration
) => {
  const { data: session } = useSession();

  const key = useMemo(() => {
    if (!session?.accessToken || !fetcher || !params) return null;
    return [fetcher.name, session.accessToken, params];
  }, [session?.accessToken, fetcher, params]);

  return useSWR<Awaited<ReturnType<T>>>(
    key,
    () => (fetcher ? (fetcher(session?.accessToken, params) as Awaited<ReturnType<T>>) : null),
    {
      revalidateOnFocus: false,
      ...options,
    }
  );
};
