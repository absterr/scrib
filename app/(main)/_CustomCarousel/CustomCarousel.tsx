import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { truncateTitle, UserPlan } from "@/lib/utils";
import { NotebookText } from "lucide-react";
import Link from "next/link";
import NewNoteCard from "./NewNoteCard";

const CustomCarousel = ({
  notes,
  userInfo,
  maxNotesReached,
}: {
  notes: { id: string; title: string; updatedAt: Date }[];
  userInfo: {
    id: string;
    plan: UserPlan;
  };
  maxNotesReached: boolean;
}) => (
  <Carousel>
    <CarouselContent>
      <CarouselItem className="basis-1/5 pl-4">
        <NewNoteCard maxNotesReached={maxNotesReached} userInfo={userInfo} />
      </CarouselItem>
      {notes.map((note) => (
        <CarouselItem className="basis-1/5 pl-4" key={note.id}>
          <Link href={note.id}>
            <Card className="shadow-none hover:shadow-sm transition-shadow h-32 w-38 text-neutral-800">
              <CardContent>
                <NotebookText />
                <hr className="mt-2 mb-1" />
                <h3 className="text-sm font-semibold">
                  {truncateTitle(note.title)}
                </h3>
              </CardContent>
            </Card>
          </Link>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
);

export default CustomCarousel;
