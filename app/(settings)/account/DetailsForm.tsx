"use client";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import React, { useState, useTransition } from "react";
import { FormDetails } from "./formDetails";
import { emailSchema, nameSchema } from "@/lib/zod/authSchema";
import { toast } from "sonner";

const DetailsForm = ({
  formDetails,
  userId,
}: {
  formDetails: FormDetails;
  userId: string;
}) => {
  const { title, purpose, placeholder, description, field, action } =
    formDetails;
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState(placeholder);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async () => {
    const value = input.trim();

    const validation =
      title === "Name"
        ? nameSchema.safeParse({ name: value })
        : emailSchema.safeParse({ email: value });

    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }
    setError(null);

    startTransition(async () => {
      if (title === "Name") {
        const { success, message } = await action(userId, value);
        success ? toast.success(message) : toast.error(message);
      } else {
        try {
          await action({
            newEmail: value,
          });
          toast("Verification email sent", {
            description:
              "A verification email has been sent to the new email. Please check your email",
          });
        } catch (error) {
          toast.error("An error occured while making email change.");
        }
      }
    });
    setIsOpen(false);
  };

  return (
    <>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex flex-col gap-4"
      >
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold text-lg">
              {isOpen ? purpose : title}
            </h3>
            <p className="text-neutral-700">
              {isOpen ? description : placeholder}
            </p>
          </div>
          <CollapsibleTrigger className="hover:underline font-semibold">
            {isOpen ? "Cancel" : "Edit"}
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent
          className={cn(
            "transition-all duration-150 ease-in-out",
            "data-[state=closed]:animate-collapsible-up",
            "data-[state=open]:animate-collapsible-down"
          )}
        >
          <div className="flex items-center justify-between py-2">
            <p className="font-semibold">{field}</p>
            {error && <p className="text-sm text-red-500 ml-2 mb-1">{error}</p>}
          </div>
          <div className="flex justify-between items-center gap-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={cn(
                "rounded-2xl border px-3 py-2 w-full focus:outline-none focus:border-2",
                error ? "border-red-500" : "focus:border-foreground"
              )}
            />
            <Button
              disabled={isPending}
              className="rounded-2xl h-10"
              onClick={handleSubmit}
            >
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <hr />
    </>
  );
};

export default DetailsForm;
