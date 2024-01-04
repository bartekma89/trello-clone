import { ReactNode } from "react";

import { Navbar } from "./_components";

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full">
      <Navbar />
      {children}
    </div>
  );
}

export default DashboardLayout;
