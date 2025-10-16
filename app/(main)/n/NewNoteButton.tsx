"use client";
import { createNote } from "@/actions/note-actions";
import LimitDialog from "@/components/LimitDialog";
import { Button } from "@/components/ui/button";
import { UserPlan } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const NewNoteButton = ({
  userId,
  userPlan,
  maxNotesReached,
}: {
  userId: string;
  userPlan: UserPlan;
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
    <LimitDialog userPlan={userPlan}>
      <Button className="bg-neutral-300 hover:bg-neutral-500">New note</Button>
    </LimitDialog>
  ) : (
    <Button
      disabled={pending}
      className="bg-neutral-300 hover:bg-neutral-500"
      onClick={handleClick}
    >
      <Plus />
      {pending ? "Creating..." : "New note"}
    </Button>
  );
};

export default NewNoteButton;
