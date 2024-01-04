import { type OrganizationResource } from "@clerk/types";

export type Organization = Pick<
  OrganizationResource,
  "imageUrl" | "id" | "slug" | "name"
>;
