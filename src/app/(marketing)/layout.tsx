import { ReactNode } from "react";

import { Footer, Navbar } from "./_components";

const MarketingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen bg-slate-100">
      <Navbar />
      <main className="pt-40 pb-20 bg-slate-100">{children}</main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
