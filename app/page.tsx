import { db } from "@/lib/db";
import { RoomCard } from "@/components/RoomCard";

export default async function Home() {
  // Hae kaikki huoneet tietokannasta
  const rooms = await db.resource.findMany({
    orderBy: {
      name: 'asc',
    }
  });

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Vapaat tilat</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
      
      {rooms.length === 0 && (
        <p className="text-center text-gray-500 mt-10">Ei huoneita saatavilla.</p>
      )}
    </main>
  );
}