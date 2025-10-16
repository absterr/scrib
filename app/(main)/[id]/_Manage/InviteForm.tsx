"use client";
import { inviteUser } from "@/actions/note-actions";
import LimitDialog from "@/components/LimitDialog";
import { Button } from "@/components/ui/button";
import { cn, UserPlan } from "@/lib/utils";
import { emailSchema } from "@/lib/zod/authSchema";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
  username: string;
  userEmail: string;
  userPlan: UserPlan;
  noteId: string;
  noteTitle: string;
  maxCollaboratorsReached: boolean;
}

const InviteForm = ({
  username,
  userEmail,
  userPlan,
  noteId,
  noteTitle,
  maxCollaboratorsReached,
}: Props) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (maxCollaboratorsReached) return;
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
          toast(error);
        } else {
          toast.error("Couldn't send invitation email.");
        }
      } else {
        toast.success("Invitation email sent", {
          description: "An invitation email with the link has been sent",
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
            "rounded-xl border-2 px-3 py-1 w-full md:w-82 focus:outline-none",
            { "border-neutral-500": !error, "border-red-500": error }
          )}
          onChange={(e) => setInput(e.target.value)}
        />
        {maxCollaboratorsReached ? (
          <LimitDialog userPlan={userPlan}>
            <Button disabled={input === ""} className="rounded-xl">
              Invite
            </Button>
          </LimitDialog>
        ) : (
          <Button
            disabled={isPending || input === ""}
            className="rounded-xl"
            onClick={handleSubmit}
          >
            {isPending ? "Inviting..." : "Invite"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default InviteForm;
