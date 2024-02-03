"use client";

import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react";
import { Plus, X } from "lucide-react";
import { useOnClickOutside, useEventListener } from "usehooks-ts";

import { createCard } from "@/actions/create-card";
import { FormSubmit } from "@/components/form";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

interface CardFormProps {
  enabledEditing: () => void;
  disabledEditing: () => void;
  listId: string;
  isEditing: boolean;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ disabledEditing, enabledEditing, isEditing, listId }, ref) => {
    const params = useParams<{ boardId: string }>();
    const formRef = useRef<ElementRef<"form">>(null);
    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess(data) {
        toast.success(`Card "${data.title}" created`);
        formRef.current?.reset();
        disabledEditing();
      },
      onError(error) {
        toast.error(error);
      },
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disabledEditing();
        formRef.current?.reset();
      }
    };

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disabledEditing);

    const onTextareaKeydown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        formRef.current?.requestSubmit();
      }
    };

    const onCancel = () => {
      disabledEditing();
      formRef.current?.reset();
    };

    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const boardId = params.boardId;
      const listId = formData.get("listId") as string;

      execute({ boardId, listId, title });
    };

    if (isEditing) {
      return (
        <form
          action={onSubmit}
          className="m-1 py-0.5 px-1 space-y-4"
          ref={formRef}>
          <FormTextarea
            id="title"
            onKeyDown={onTextareaKeydown}
            ref={ref}
            placeholder="Enter a title for this card..."
            errors={fieldErrors}
          />
          <input hidden id="listId" name="listId" value={listId} readOnly />

          <div className="flex items-center gap-x-1">
            <FormSubmit>Add a card</FormSubmit>
            <Button variant="ghost" size="sm" onClick={onCancel} type="reset">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="pt-2 px-2">
        <Button
          onClick={enabledEditing}
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
          size="sm"
          variant="ghost">
          <Plus className="h-4 w-4 mr-2" />
          Add a card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";
