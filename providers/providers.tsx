"use client";

import { PropsWithChildren } from "react";
import { AuthProvider } from "./auth";
import { SWRProvider } from "./swr";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <SWRProvider>
      <AuthProvider>{children}</AuthProvider>
    </SWRProvider>
  );
};

export default Providers;
