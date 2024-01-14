"use client";

import { Board } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";

import { updateBoard } from "@/actions/update-board";
import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";

interface BoardTitleFormProps {
  data: Board;
}

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const [isEditing, setEditing] = useState(false);
  const [title, setTitle] = useState(data.title);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const { execute } = useAction(updateBoard, {
    onError: (error) => {
      toast.error(error);
    },
    onSuccess: (data) => {
      toast.success(`Board ${data.title} updated!`);
      setTitle(data.title);
      disableEditing();
    },
  });

  const enableEditing = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setEditing(false);
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const changedTitle = formData.get("title") as string;

    execute({ title: changedTitle, id: data.id });
  };

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        className="flex items-center gap-x-2"
        ref={formRef}>
        <FormInput
          ref={inputRef}
          id="title"
          defaultValue={title}
          onBlur={onBlur}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      variant="transparent"
      className="font-bold text-lg h-auto w-auto p-1 px-2">
      {title}
    </Button>
  );
};
