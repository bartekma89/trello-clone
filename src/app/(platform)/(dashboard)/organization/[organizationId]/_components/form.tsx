"use client";

import { createBoard } from "@/actions/create-board/index";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { useFormState } from "react-dom";

export const Form = () => {
  const { fieldErrors, execute } = useAction(createBoard, {
    onSuccess: (data) => console.log(data),
    onError: (error) => console.error(error),
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title")?.toString();

    if (title) {
      execute({ title, image: "" });
    }
  };

  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          placeholder="Enter the board title"
          required
          id="title"
          name="title"
          className="border-black border p-1"
        />
        {fieldErrors?.title ? (
          <div>
            {fieldErrors?.title.map((error: string) => {
              return (
                <p key={error} className="text-rose-500">
                  {error}
                </p>
              );
            })}
          </div>
        ) : null}
        <Button type="submit" size="sm">
          Submit
        </Button>
      </div>
    </form>
  );
};
