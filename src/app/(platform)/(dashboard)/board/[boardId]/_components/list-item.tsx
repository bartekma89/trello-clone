"use client";

import { ElementRef, useState, useRef } from "react";

import { ListWithCard } from "@/types";
import { ListHeader } from "./list-header";
import { CardForm } from "./card-form";
import { cn } from "@/lib/utils";
import { CardItem } from "./cart-item";

interface ListItemProps {
  index: number;
  data: ListWithCard;
}

export const ListItem = ({ data, index }: ListItemProps) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const [isEdititing, setIsEditing] = useState(false);

  const disabledEditing = () => {
    setIsEditing(false);
  };
  const enabledEditing = () => {
    setIsEditing(true);
    textareaRef.current?.focus();
  };

  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader data={data} onAddCard={enabledEditing} />
        <ol
          className={cn(
            "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
            data.cards.length > 0 ? "mt-2" : "mt-0"
          )}>
          {data.cards.map((card, index) => {
            return <CardItem key={card.id} card={card} index={index} />;
          })}
        </ol>
        <CardForm
          ref={textareaRef}
          isEditing={isEdititing}
          disabledEditing={disabledEditing}
          enabledEditing={enabledEditing}
          listId={data.id}
        />
      </div>
    </li>
  );
};
