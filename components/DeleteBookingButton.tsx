'use client'

import { deleteBooking } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useTransition } from "react";

export function DeleteBookingButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteBooking(id);
      toast.success(result.message);
    });
  };

  return (
    <Button 
      variant="destructive" 
      size="sm" 
      onClick={handleDelete} 
      disabled={isPending}
    >
      {isPending ? "..." : <Trash2 size={16} />}
    </Button>
  );
}