import { ReactNode } from "react";
import { OrgControl } from "./_components";

function OrganizationIdLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
}

export default OrganizationIdLayout;
