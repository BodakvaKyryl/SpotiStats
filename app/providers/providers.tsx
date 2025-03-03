import Layout from "~/pages/layout";
import type { PropsWithChildren } from "react";
import { AuthProvider } from "./auth";
import { SWRProvider } from "./swr";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <SWRProvider>
      <AuthProvider>
        <Layout>{children}</Layout>
      </AuthProvider>
    </SWRProvider>
  );
};

export default Providers;
