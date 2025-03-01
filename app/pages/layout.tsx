import { Navbar } from "~/components";
import { type PropsWithChildren } from "react";
import { Outlet } from "react-router";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      {children}
      <Outlet />

      {/* Footer will be here */}
    </>
  );
};

export default Layout;
