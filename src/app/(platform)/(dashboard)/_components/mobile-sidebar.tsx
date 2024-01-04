"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { Menu } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";

export const MobileSidebar = () => {
  const hasMounted = useHasMounted();
  const { isOpen, onClose, onOpen } = useMobileSidebar();
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={onOpen}
        className="block md:hidden mr-2">
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-2 pt-10">
          <Sidebar storageKey="t-sidebar-mobile-state" />
        </SheetContent>
      </Sheet>
    </>
  );
};
