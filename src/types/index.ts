import { type OrganizationResource } from "@clerk/types";
import { Card, List } from "@prisma/client";

export type Organization = Pick<
  OrganizationResource,
  "imageUrl" | "id" | "slug" | "name"
>;
export type ListWithCard = List & { cards: Card[] };
export type CardWithList = Card & { list: List };
