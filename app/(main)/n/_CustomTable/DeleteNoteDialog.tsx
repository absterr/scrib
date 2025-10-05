import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DeleteNoteButton from "./DeleteNoteButton";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const DeleteNoteDialog = ({ noteId }: { noteId: string }) => (
  <Dialog>
    <DialogTrigger className="p-2 rounded-sm text-white bg-neutral-300 hover:text-red-400 hover:bg-neutral-300 transition-colors duration-100">
      <Trash2 className="w-4 h-4" />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirm delete</DialogTitle>
        <DialogDescription>
          This will delete the note and all associated data
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <DeleteNoteButton noteId={noteId} />
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default DeleteNoteDialog;
