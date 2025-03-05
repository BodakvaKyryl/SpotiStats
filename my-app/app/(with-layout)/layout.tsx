import { Navbar } from "@/components";
import { type PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <section className="mx-auto mt-16 max-w-7xl px-4 py-8">{children}</section>
    </>
  );
};

export default Layout;
