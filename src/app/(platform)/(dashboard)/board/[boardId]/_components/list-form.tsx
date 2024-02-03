"use client";

import { Button } from "@/components/ui/button";
import { ListWrapper } from "./list-wrapper";
import { Plus, X } from "lucide-react";
import { FormInput, FormSubmit } from "@/components/form";
import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useParams, useRouter } from "next/navigation";
import { useAction } from "@/hooks/use-action";
import { createList } from "@/actions/create-list/";
import { toast } from "sonner";

export const ListForm = () => {
  const params = useParams<{ boardId: string }>();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disabledEditing = () => {
    setIsEditing(false);
  };

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List ${data.title} created`);
      disabledEditing();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      disabledEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disabledEditing);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;

    execute({ boardId, title });
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-2 rounded-md bg-white space-y-4 shadow-md">
          <FormInput
            ref={inputRef}
            id="title"
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="Enter list title..."
            errors={fieldErrors}
          />
          <input hidden value={params.boardId} name="boardId" readOnly />
          <div className="flex items-center gap-x-1">
            <FormSubmit> Add list</FormSubmit>
            <Button onClick={disabledEditing} size="sm" variant="ghost">
              <X />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm">
        <Plus className="h-4 w-4 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  );
};
