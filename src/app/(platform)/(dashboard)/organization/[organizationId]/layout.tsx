import { ReactNode } from "react";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import startCase from "lodash/startCase";

import { OrgControl } from "./_components";

export const generateMetadata = async (): Promise<Metadata> => {
  const { orgSlug } = auth();

  return {
    title: startCase(orgSlug || "Organization"),
  };
};

function OrganizationIdLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
}

export default OrganizationIdLayout;
