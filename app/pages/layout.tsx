import { Navbar } from "~/components";
import { type PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <main className="mx-auto mt-16 max-w-7xl px-4 py-8">
          {children}
          {/* <Outlet /> */}
        </main>
      </div>
    </>
  );
};

export default Layout;
