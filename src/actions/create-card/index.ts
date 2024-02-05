"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { CreateCard } from "./schema";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Card } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth();

  if (!orgId || !userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { boardId, title, listId } = data;

  let card;

  try {
    const list = db.list.findUnique({
      where: {
        id: listId,
        board: {
          id: boardId,
        },
      },
    });

    if (!list) {
      return {
        error: "List not found",
      };
    }

    const lastCard = await db.card.findFirst({
      where: {
        listId,
      },
      orderBy: {
        position: "desc",
      },
      select: {
        position: true,
      },
    });

    const newPosition = lastCard ? lastCard.position + 1 : 1;

    card = await db.card.create({
      data: {
        title,
        position: newPosition,
        listId,
      },
    });
  } catch {
    return {
      error: "Failed to create",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: card,
  };
};

export const createCard = createSafeAction(CreateCard, handler);
