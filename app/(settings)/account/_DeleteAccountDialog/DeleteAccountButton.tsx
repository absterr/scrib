"use client";
import { deleteUser } from "@/actions/user-actions";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const DeleteAccountButton = ({ userId }: { userId: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      try {
        await deleteUser(userId);
        redirect("/");
      } catch (error) {
        toast.error(`Couldn't delete account. ${error}`);
      }
    });
  };

  return (
    <Button onClick={handleClick} disabled={isPending} variant="destructive">
      {isPending ? <LoadingSpinner /> : "Delete"}
    </Button>
  );
};

export default DeleteAccountButton;
