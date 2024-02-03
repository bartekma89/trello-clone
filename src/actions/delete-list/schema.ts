import { z } from "zod";

export const DeleteList = z.object({
  boardId: z.string(),
  id: z.string(),
});
