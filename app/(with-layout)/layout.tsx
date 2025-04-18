import { Footer, Navbar } from "@/components";
import { type PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <section className="mx-auto mt-16 max-w-7xl flex-grow px-4 py-8">{children}</section>
      <Footer />
    </div>
  );
};

export default Layout;
