import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ListContainer } from "./_components";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardPage = async ({ params }: BoardIdPageProps) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          position: "desc",
        },
      },
    },
    orderBy: {
      order: "desc",
    },
  });

  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer data={lists} boardId={params.boardId} />
    </div>
  );
};

export default BoardPage;
