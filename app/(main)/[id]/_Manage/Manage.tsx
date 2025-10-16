import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/lib/utils";
import InviteForm from "./InviteForm";
import UsersList from "./UsersList";

const Manage = ({
  noteId,
  noteTitle,
  users,
  currentUserDetails,
  maxCollaboratorsReached,
}: {
  noteId: string;
  noteTitle: string;
  users: User[];
  currentUserDetails: User;
  maxCollaboratorsReached: boolean;
}) => {
  const { id, name, email, role } = currentUserDetails;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="px-2 py-3 shadow-none">
          Users
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-2xl">
        {(role === "owner" || "admin") && (
          <InviteForm
            username={name}
            userEmail={email}
            noteId={noteId}
            noteTitle={noteTitle}
            maxCollaboratorsReached={maxCollaboratorsReached}
          />
        )}
        <div>
          {users.map((user) => (
            <UsersList
              user={user}
              noteId={noteId}
              currentUserId={id}
              currentUserRole={role}
              key={user.email}
            />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Manage;
