"use client";
import { inviteUser } from "@/actions/note-actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { emailSchema } from "@/lib/zod/authSchema";
import { useState, useTransition } from "react";

const InviteForm = ({
  username,
  userEmail,
  noteId,
  noteTitle,
}: {
  username: string;
  userEmail: string;
  noteId: string;
  noteTitle: string;
}) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = () => {
    const validation = emailSchema.safeParse({ email: input.trim() });
    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    setError(null);
    const receiverEmail = input.trim();

    startTransition(async () => {
      const { success, error } = await inviteUser(
        username,
        userEmail,
        receiverEmail,
        noteId,
        noteTitle
      );
      if (success === false) {
        if (error === "This user is already a member") {
          toast({
            title: error,
            variant: "default",
          });
        } else {
          toast({
            description: "Couldn't send invitation email.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Invitation email sent",
          description: "An invitation email with the link has been sent",
          variant: "success",
        });
        setInput("");
      }
    });
  };

  return (
    <div className="p-2">
      {error && <p className="text-sm text-red-500 ml-2 mb-1">{error}</p>}
      <div className="flex gap-2 mx-1 py-1">
        <input
          type="email"
          placeholder="Email"
          value={input}
          className={cn(
            "rounded-xl border-2 px-3 py-1 w-86 focus:outline-none",
            { "border-neutral-500": !error, "border-red-500": error }
          )}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          disabled={isPending || input === ""}
          className="rounded-xl"
          onClick={handleSubmit}
        >
          Invite
        </Button>
      </div>
    </div>
  );
};

export default InviteForm;
