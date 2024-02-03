"use client";

import { useRef, useState, ElementRef } from "react";

import { List } from "@prisma/client";
import { FormInput } from "@/components/form/form-input";
import { useEventListener } from "usehooks-ts";
import { useAction } from "@/hooks/use-action";
import { updateList } from "@/actions/update-list";
import { toast } from "sonner";
import { ListOptions } from "./list-options";

interface ListHeaderProps {
  data: List;
  onAddCard: () => void;
}

export const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => setIsEditing(false);

  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed to ${data.title}`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  useEventListener("keydown", onKeyDown);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if (title === data.title) {
      return disableEditing();
    }

    execute({ title, boardId, id });
  };

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form action={onSubmit} ref={formRef}>
          <input id="id" name="id" defaultValue={data.id} hidden readOnly />
          <input
            id="boardId"
            name="boardId"
            defaultValue={data.boardId}
            hidden
          />
          <FormInput
            ref={inputRef}
            id="title"
            defaultValue={title}
            onBlur={onBlur}
            placeholder="Enter list title.."
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
          <button type="submit" hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent">
          {title}
        </div>
      )}
      <ListOptions onAddCard={onAddCard} data={data} />
    </div>
  );
};
