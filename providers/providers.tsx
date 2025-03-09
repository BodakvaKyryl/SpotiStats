"use client";

import { PropsWithChildren } from "react";
import { SWRProvider } from "./swr";
import NextAuthProvider from "./nextAuthProvider";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <SWRProvider>
      <NextAuthProvider>{children}</NextAuthProvider>
    </SWRProvider>
  );
};

export default Providers;
