import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";

function PlatformLayout({ children }: { children: ReactNode }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}

export default PlatformLayout;
