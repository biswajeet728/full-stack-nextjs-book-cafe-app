import Footer from "@/components/_footer";
import Header from "@/components/_header";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className="root-container">
      <Header />
      {children}
      <hr className="my-5 border-t border-gray-100 border-opacity-40 container mx-auto" />
      <Footer />
    </main>
  );
};

export default Layout;
