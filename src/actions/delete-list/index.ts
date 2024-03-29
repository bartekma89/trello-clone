"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteList } from "./schema";
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

  const { boardId, id } = data;

  let list;

  try {
    list = await db.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    });
  } catch {
    return {
      error: "Failed to delete",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: list,
  };
};

export const deleteList = createSafeAction(DeleteList, handler);
