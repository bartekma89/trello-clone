import { db } from "@/lib/db";
import { Board } from "./_components/board";
import { Form } from "./_components/form";

async function OrganizationIdPage() {
  const boards = await db.board.findMany();

  return (
    <div>
      <Form />
      <div className="space-y-2 mt-4">
        {boards.map((board) => {
          return <Board key={board.id} id={board.id} title={board.title} />;
        })}
      </div>
    </div>
  );
}

export default OrganizationIdPage;
