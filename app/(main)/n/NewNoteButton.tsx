"use client";
import { createNote } from "@/actions/note-actions";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const NewNoteButton = () => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const { data, isPending } = useSession();

  if (isPending) return <Skeleton className="h-8 w-24" />;
  if (!data || !data.user) return null;

  const handleClick = () => {
    startTransition(async () => {
      try {
        const newNote = await createNote(data.user.id);
        if (newNote) router.push(`${newNote.id}`);
      } catch (error) {
        toast.error(`Couldn't create a new note. ${error}`);
      }
    });
  };

  return (
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
