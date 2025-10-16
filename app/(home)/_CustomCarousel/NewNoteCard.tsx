"use client";
import { createNote } from "@/actions/note-actions";
import { Card, CardContent } from "@/components/ui/card";
import { NotebookPen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const NewNoteCard = ({
  userId,
  maxNotesReached,
}: {
  userId: string;
  maxNotesReached: boolean;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (maxNotesReached) return;
    startTransition(async () => {
      try {
        const newNote = await createNote(userId);
        if (newNote) router.push(`${newNote.id}`);
      } catch (error) {
        toast.error(`Couldn't create a new note. ${error}`);
      }
    });
  };

  return (
    <button
      disabled={isPending}
      onClick={handleClick}
      className="cursor-pointer"
    >
      <Card className="shadow-none hover:shadow-sm transition-shadow h-32 w-38 text-neutral-600">
        <CardContent>
          <NotebookPen />
          <hr className="mt-2 mb-1" />
          <h3 className="text-sm font-semibold text-left">
            {isPending ? "Creating" : "New note"}
          </h3>
        </CardContent>
      </Card>
    </button>
  );
};

export default NewNoteCard;
