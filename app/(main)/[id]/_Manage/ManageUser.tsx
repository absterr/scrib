"use client";
import { changeUserRole, removeCollaborator } from "@/actions/note-actions";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Check } from "lucide-react";
import { useTransition } from "react";
import { UserRole } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface DropdownItem {
  role: UserRole;
  description: string;
}

const dropdownItems: DropdownItem[] = [
  { role: "admin", description: "Can edit note and manage users" },
  { role: "editor", description: "Can edit note" },
];

const ManageUser = ({
  id,
  noteId,
  role,
}: {
  id: string;
  noteId: string;
  role: UserRole;
}) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleChangeUserRole = (newRole: UserRole) => {
    startTransition(async () => {
      try {
        await changeUserRole(id, noteId, newRole);
      } catch (error) {
        toast({
          description: `Couldn't change user priviledges. ${error}`,
          variant: "destructive",
        });
      }
    });
  };

  const handleRemoveUser = () => {
    startTransition(async () => {
      try {
        await removeCollaborator(id, noteId);
      } catch (error) {
        toast({
          description: `Couldn't remove user. ${error}`,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <>
      {dropdownItems.map((item) => (
        <DropdownMenuItem
          key={item.role}
          className="flex"
          disabled={isPending}
          onClick={() => handleChangeUserRole(item.role)}
        >
          <div className="flex flex-col">
            <p>{item.role}</p>
            <p className="text-xs text-neutral-200">{item.description}</p>
          </div>
          {role === item.role && <Check />}
        </DropdownMenuItem>
      ))}
      <hr />
      <DropdownMenuItem onClick={handleRemoveUser}>Remove</DropdownMenuItem>
    </>
  );
};

export default ManageUser;
