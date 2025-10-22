"use client";
import { changeUserRole, removeCollaborator } from "@/actions/note-actions";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { UserRole } from "@/lib/utils";
import { Check } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

interface DropdownItem {
  role: UserRole;
  description: string;
}

const dropdownItems: DropdownItem[] = [
  { role: "Admin", description: "Can edit note and manage users" },
  { role: "Editor", description: "Can edit note" },
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

  const handleChangeUserRole = (newRole: UserRole) => {
    startTransition(async () => {
      try {
        await changeUserRole(id, noteId, newRole);
      } catch (error) {
        toast.error(`Couldn't change user priviledges. ${error}`);
      }
    });
  };

  const handleRemoveUser = () => {
    startTransition(async () => {
      try {
        await removeCollaborator(id, noteId);
        toast.success("User removed from note successfully");
      } catch (error) {
        toast.error(`Couldn't remove user, ${error}`);
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
            <p className="text-xs text-neutral-500">{item.description}</p>
          </div>
          {role === item.role && <Check />}
        </DropdownMenuItem>
      ))}
      <hr />
      <DropdownMenuItem onClick={handleRemoveUser} disabled={isPending}>
        {isPending ? "Removing..." : "Remove"}
      </DropdownMenuItem>
    </>
  );
};

export default ManageUser;
