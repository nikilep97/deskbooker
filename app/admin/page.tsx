import { db } from "@/lib/db";
import { format } from "date-fns";
import { DeleteBookingButton } from "@/components/DeleteBookingButton"; 
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminPage() {
  // Hae kaikki varaukset + liitetyt tiedot
  const bookings = await db.booking.findMany({
    include: {
      user: true,     
      resource: true, 
    },
    orderBy: {
      startTime: 'desc' 
    }
  });

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Hallintapaneeli</h1>
        <Button asChild variant="outline">
          <Link href="/">Takaisin etusivulle</Link>
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 border-b">
            <tr>
              <th className="p-4 font-medium">Huone</th>
              <th className="p-4 font-medium">Varaaja</th>
              <th className="p-4 font-medium">Aika</th>
              <th className="p-4 font-medium">Toiminnot</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-slate-50">
                <td className="p-4">{booking.resource.name}</td>
                <td className="p-4">
                  <div className="font-medium">{booking.user.name}</div>
                  <div className="text-gray-500 text-xs">{booking.user.email}</div>
                </td>
                <td className="p-4">
                  <div>{format(booking.startTime, "d.M.yyyy")}</div>
                  <div className="text-gray-500">
                    {format(booking.startTime, "HH:mm")} - {format(booking.endTime, "HH:mm")}
                  </div>
                </td>
                <td className="p-4">
                  <DeleteBookingButton id={booking.id} />
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  Ei varauksia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}