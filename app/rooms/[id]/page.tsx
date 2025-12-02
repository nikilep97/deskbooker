import { db } from "@/lib/db";
import { BookingForm } from "@/components/BookingForm";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function RoomPage({ params }: PageProps) {
    const { id } = await params;

    // Haku tietokannasta URL-parametrin perusteella
    const room = await db.resource.findUnique({
        where: { id: id }
    });

    if (!room) return notFound();

    return (
        <main className="container mx-auto py-10 px-4 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
            <h1 className="text-4xl font-bold mb-4">{room.name}</h1>
            <Badge className="mb-4 text-lg">
                {(room.pricePerHour / 100).toFixed(2)} € / h
            </Badge>
            <p className="text-white-600 text-lg mb-6">{room.description}</p>
            
            <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Tiedot:</h3>
                <ul className="list-disc list-inside text-gray-700">
                <li>Kapasiteetti: {room.capacity} hlö</li>
                <li>Varustelu: WiFi, Näyttö</li>
                </ul>
            </div>
            </div>
            <div>
            <h2 className="text-2xl font-semibold mb-4">Tee varaus</h2>
            <BookingForm resourceId={room.id} />
            </div>
        </div>
        </main>
    );
}