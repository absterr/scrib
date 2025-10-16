import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, UserPlan } from "@/lib/utils";
import InviteForm from "./InviteForm";
import UsersList from "./UsersList";

interface Props {
  noteDetails: {
    noteId: string;
    noteTitle: string;
  };
  users: User[];
  currentUserInfo: User;
  userPlan: UserPlan;
  maxCollaboratorsReached: boolean;
}

const Manage = ({
  noteDetails,
  users,
  currentUserInfo,
  userPlan,
  maxCollaboratorsReached,
}: Props) => {
  const { id, name, email, role } = currentUserInfo;
  const { noteId, noteTitle } = noteDetails;

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
            userPlan={userPlan}
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
