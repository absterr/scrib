"use client";
import { deleteNote } from "@/actions/note-actions";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

const DeleteNoteButton = ({ noteId }: { noteId: string }) => {
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      try {
        await deleteNote(noteId);
        toast.success("Note successfully deleted.");
      } catch (error) {
        toast.error(`Couldn't delete note. ${error}`);
      }
    });
  };

  return (
    <Button onClick={handleClick} disabled={pending} variant="destructive">
      {pending ? <LoadingSpinner /> : "Delete"}
    </Button>
  );
};

export default DeleteNoteButton;
