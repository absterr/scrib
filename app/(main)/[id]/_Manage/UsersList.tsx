import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRole } from "@/lib/utils";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import ManageUser from "./ManageUser";

const UsersList = ({
  id,
  name,
  email,
  role,
  noteId,
  currentUserId,
  currentUserRole,
}: {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  noteId: string;
  currentUserId: string;
  currentUserRole: UserRole;
}) => {
  return (
    <div className="flex justify-between gap-2 px-3 mx-1 py-1 mb-1 rounded-xl hover:bg-neutral-100 transition-colors duration-150">
      <div className="flex flex-col">
        <p className="text-sm font-semibold">
          {name}
          {currentUserId === id && (
            <span className="text-neutral-600"> (You)</span>
          )}
        </p>
        <p className="font-light text-xs text-neutral-600">{email}</p>
      </div>
      <div className="flex items-center">
        {currentUserRole === "editor" || role === "owner" ? (
          <p className="text-neutral-600 px-1">{role}</p>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-2xl hover:bg-neutral-200 px-3 py-2">
              <div className="flex justify-between">
                <span>{role}</span>
                <ChevronDown />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <ManageUser id={id} noteId={noteId} role={role} />
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default UsersList;
