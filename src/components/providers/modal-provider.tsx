"use client";

import { useHasMounted } from "@/hooks/use-has-mounted";
import { CardModal } from "../modals/card-modal";
export const ModalProvider = () => {
  const isMounded = useHasMounted();

  if (!isMounded) {
    return null;
  }

  return (
    <>
      <CardModal />
    </>
  );
};
