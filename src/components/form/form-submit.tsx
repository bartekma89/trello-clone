"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface FormSubmitProps {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: NonNullable<ButtonProps["variant"]>;
}

export const FormSubmit = ({
  children,
  className,
  disabled,
  variant = "primary",
}: FormSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      className={cn(className)}
      variant={variant}
      type="submit"
      size="sm"
      disabled={pending || disabled}>
      {children}
    </Button>
  );
};
