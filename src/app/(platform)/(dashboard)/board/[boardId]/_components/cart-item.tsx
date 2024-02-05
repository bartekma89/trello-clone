import { useCardModal } from "@/hooks/use-card-modal";
import { Card } from "@prisma/client";

interface CardItemProps {
  card: Card;
  index: number;
}

export const CardItem = ({ card, index }: CardItemProps) => {
  const cardModal = useCardModal();
  return (
    <div
      onClick={() => cardModal.onOpen(card.id)}
      role="button"
      className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm">
      {card.title}
    </div>
  );
};
