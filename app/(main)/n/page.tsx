import { auth } from "@/lib/auth";
import { PLAN_LIMITS } from "@/lib/planLimits";
import {
  getUserCollaborationsNotes,
  getUserOwnedNotesCount,
} from "@/lib/queries";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import NewNoteButton from "./NewNoteButton";
import CustomTable from "./_CustomTable";

const NoteListPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user) redirect("/login");

  const userInfo = {
    id: session.user.id,
    plan: session.user.plan,
  };

  const notes = await getUserCollaborationsNotes(userInfo.id);
  const userLimit = PLAN_LIMITS[userInfo.plan];
  const { count } = await getUserOwnedNotesCount(userInfo.id);
  const maxNotesReached = count >= userLimit.maxNotes;

  return (
    <section className="max-w-7xl py-8 mx-auto px-4">
      <h1>Notes</h1>
      {notes.length !== 0 ? (
        <CustomTable
          notes={notes}
          userId={userInfo.id}
          maxNotesReached={maxNotesReached}
        />
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <p className="pt-6 text-neutral-600">
            Notes you contribute to will show here
          </p>
          <NewNoteButton
            userId={userInfo.id}
            maxNotesReached={maxNotesReached}
          />
        </div>
      )}
    </section>
  );
};

export default NoteListPage;
