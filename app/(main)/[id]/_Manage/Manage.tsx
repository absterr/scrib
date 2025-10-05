import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import InviteForm from "./InviteForm";
import { Button } from "@/components/ui/button";
import UsersList from "./UsersList";
import { UserRole } from "@/lib/utils";

interface Props {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

const Manage = ({
  noteId,
  noteTitle,
  users,
  currentUserId,
  currentUsername,
  currentUserEmail,
  currentUserRole,
}: {
  noteId: string;
  noteTitle: string;
  users: Props[];
  currentUserId: string;
  currentUsername: string;
  currentUserEmail: string;
  currentUserRole: UserRole;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="px-2 py-3 shadow-none">
        Users
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="rounded-2xl">
      {(currentUserRole === "owner" || "admin") && (
        <InviteForm
          username={currentUsername}
          userEmail={currentUserEmail}
          noteId={noteId}
          noteTitle={noteTitle}
        />
      )}
      <div>
        {users.map((user) => (
          <UsersList
            id={user.id}
            name={user.name}
            email={user.email}
            role={user.role}
            noteId={noteId}
            currentUserId={currentUserId}
            currentUserRole={currentUserRole}
            key={user.email}
          />
        ))}
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default Manage;
