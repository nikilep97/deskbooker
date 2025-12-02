'use client'

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { createBooking } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Vartaan..." : "Vahvista varaus"}
        </Button>
    );
}

export function BookingForm({ resourceId }: { resourceId: string }) {
  const [state, formAction] = useActionState(createBooking, null);
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (state?.message) {
      if (state.message.includes("onnistui")) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6 border p-6 rounded-lg shadow-sm">
      <input type="hidden" name="resourceId" value={resourceId} />
      <input type="hidden" name="date" value={date ? format(date, "yyyy-MM-dd") : ""} />

      {state?.message && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {state.message}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label>Valitse päivä</Label>
        <div className="border rounded-md w-fit">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) => date < new Date()} // Estä menneet päivät
            autoFocus
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="startTime">Aloitusaika</Label>
          <Input type="time" id="startTime" name="startTime" required />
        </div>
        
        <div className="flex flex-col gap-2">
          <Label htmlFor="endTime">Lopetusaika</Label>
          <Input type="time" id="endTime" name="endTime" required />
        </div>
      </div>

      <SubmitButton />
    </form>
  );
}