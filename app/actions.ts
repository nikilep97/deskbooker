'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBooking(prevState: any, formData: FormData) {
  const resourceId = formData.get("resourceId") as string;
  const date = formData.get("date") as string;
  const startTime = formData.get("startTime") as string;
  const endTime = formData.get("endTime") as string;

  const fakeUserId = (await db.user.findFirst())?.id;
  if (!fakeUserId) return { message: "Virhe: Ei käyttäjiä." };

  // Luodaan päivämäärät
  const startDateTime = new Date(`${date}T${startTime}:00`);
  const endDateTime = new Date(`${date}T${endTime}:00`);

  if (startDateTime >= endDateTime) {
    return { message: "Loppumisajan pitää olla alkamisajan jälkeen." };
  }

  // Tarkista päällekkäisyys
  const overlap = await db.booking.findFirst({
    where: {
      resourceId: resourceId,
      AND: [
        { startTime: { lt: endDateTime } },
        { endTime: { gt: startDateTime } }
      ]
    }
  });

  await db.booking.create({
    data: {
      userId: fakeUserId,
      resourceId: resourceId,
      startTime: startDateTime,
      endTime: endDateTime,
    }
  });

  revalidatePath("/");
  redirect("/?success=true"); 
  return { message: "Varaus onnistui!" };
}

export async function deleteBooking(bookingId: string) {
  try {
    await db.booking.delete({
      where: { id: bookingId }
    });

    revalidatePath("/admin");
    revalidatePath("/");
    return { message: "Varaus poistettu." };
  } catch (error) {
    return { message: "Virhe poistettaessa varausta." };
  }
}