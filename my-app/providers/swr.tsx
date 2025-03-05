import axios, { type AxiosRequestConfig } from "axios";
import type { PropsWithChildren } from "react";
import { SWRConfig } from "swr";

export function SWRProvider({ children }: PropsWithChildren) {
  return (
    <SWRConfig
      value={{
        // Do not refresh the data by default
        fetcher: fetcher,
      }}>
      {children}
    </SWRConfig>
  );
}

// Fetcher to fetch data from any api using fetch
const fetcher = ([url, config]: [string, AxiosRequestConfig]) => axios.get(url, config).then((res) => res.data);
