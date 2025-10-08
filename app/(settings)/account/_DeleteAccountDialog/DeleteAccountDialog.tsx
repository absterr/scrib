import { Button } from "@/components/ui/button";
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
import DeleteAccountButton from "./DeleteAccountButton";

const DeleteAccountDialog = ({ userId }: { userId: string }) => (
  <Dialog>
    <DialogTrigger className="text-red-600 font-semibold hover:underline">
      Delete
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirm delete</DialogTitle>
        <DialogDescription>
          Deleting your account is permanent and irreversible. You will loose
          all your notes, collaborations and subscriptions.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <DeleteAccountButton userId={userId} />
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default DeleteAccountDialog;
