import { Navbar } from "@/components";
import { AuthGuard } from "@/components/auth-guard";
import { type PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <AuthGuard>
      <>
        <Navbar />
        <section className="mx-auto mt-16 max-w-7xl px-4 py-8">{children}</section>
      </>
    </AuthGuard>
  );
};

export default Layout;
