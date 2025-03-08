import axios from "axios";
import type { PropsWithChildren } from "react";
import { SWRConfig } from "swr";

export function SWRProvider({ children }: PropsWithChildren) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => {
          if (Array.isArray(resource)) {
            const [url, config] = resource;
            return axios.get(url, config).then((res) => res.data);
          } else {
            return axios.get(resource, init).then((res) => res.data);
          }
        },
      }}>
      {children}
    </SWRConfig>
  );
}
