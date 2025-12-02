import { Resource } from "@prisma/client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react"; // Ikonit (Next.js/Lucide tulee oletuksena)

// Määritellään, että komponentti ottaa vastaan yhden "Resource"-objektin
interface RoomCardProps {
  room: Resource;
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{room.name}</CardTitle>
          <Badge variant="secondary">{(room.pricePerHour / 100).toFixed(2)} €/h</Badge>
        </div>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users size={16} />
          <span>Max {room.capacity} hlö</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/rooms/${room.id}`}>
            Varaa tila
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}