"use client";

import useSWR, { SWRConfiguration } from "swr";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAuthSWR = <T extends (...args: any[]) => unknown, ParamT = Parameters<T>[1]>(
  fetcher: T,
  params: ParamT,
  options?: SWRConfiguration
) => {
  const { data: session } = useSession();

  const key = useMemo(() => {
    if (!session?.accessToken) return null;
    return [fetcher.name, session.accessToken, params];
  }, [session?.accessToken, fetcher.name, params]);

  return useSWR<Awaited<ReturnType<T>>>(key, () => fetcher(session?.accessToken, params) as Awaited<ReturnType<T>>, {
    revalidateOnFocus: false,
    ...options,
  });
};
