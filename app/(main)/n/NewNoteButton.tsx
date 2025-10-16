"use client";
import { createNote } from "@/actions/note-actions";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import LimitDialogButton from "./_LimitDialogButton";

const NewNoteButton = ({
  userId,
  maxNotesReached,
}: {
  userId: string;
  maxNotesReached: boolean;
}) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

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

  return maxNotesReached ? (
    <Button
      disabled={pending}
      className="bg-neutral-300 hover:bg-neutral-500"
      onClick={handleClick}
    >
      <Plus />
      {pending ? "Creating..." : "New note"}
    </Button>
  ) : (
    <LimitDialogButton />
  );
};

export default NewNoteButton;
