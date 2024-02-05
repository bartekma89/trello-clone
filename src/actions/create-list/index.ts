"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { CreateList } from "./schema";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth();

  if (!orgId || !userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { boardId, title } = data;

  let list;

  try {
    const board = await db.board.findUnique({
      where: {
        orgId,
        id: boardId,
      },
    });

    if (!board) {
      return {
        error: "Board not found",
      };
    }

    const lastList = await db.list.findFirst({
      where: {
        boardId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({
      data: {
        title,
        boardId,
        order: newOrder,
      },
    });
  } catch {
    return {
      error: "Failed to create",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: list,
  };
};

export const createList = createSafeAction(CreateList, handler);
