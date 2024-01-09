import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";

type BoardType = {
  title: string;
  id: string;
};

export function Board({ id, title }: BoardType) {
  const deleteBoardWithId = deleteBoard.bind(null, id);

  return (
    <form>
      <p className="inline-block">Board title: {title}</p>
      <Button
        className="ml-2"
        formAction={deleteBoardWithId}
        variant="destructive"
        size="sm">
        Delete
      </Button>
    </form>
  );
}
