"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateBoard } from "./schema";
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

  const { id, title } = data;

  let board;

  try {
    board = await db.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        title,
      },
    });
  } catch {
    return {
      error: "Failed update",
    };
  }

  revalidatePath(`/board/${data.id}`);

  return {
    data: board,
  };
};

export const updateBoard = createSafeAction(UpdateBoard, handler);
