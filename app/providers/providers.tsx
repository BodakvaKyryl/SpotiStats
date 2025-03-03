import Layout from "~/pages/layout";
import type { PropsWithChildren } from "react";
import { AuthProvider } from "./auth";

export * from "./auth";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AuthProvider>
      <Layout>{children}</Layout>
    </AuthProvider>
  );
};

export default Providers;
