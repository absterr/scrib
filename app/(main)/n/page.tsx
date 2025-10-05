import { auth } from "@/lib/auth";
import { getUserCollaborationsNotes } from "@/lib/queries";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import NewNoteButton from "./NewNoteButton";
import CustomTable from "./_CustomTable";

const NoteListPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user) redirect("/login");

  const userId = session.user.id;
  const notes = await getUserCollaborationsNotes(userId);

  return (
    <section className="max-w-7xl py-8 mx-auto px-4">
      <h1>Notes</h1>
      {notes.length !== 0 ? (
        <CustomTable notes={notes} userId={userId} />
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <p className="pt-6 text-neutral-600">
            Notes you contribute to will show here
          </p>
          <NewNoteButton />
        </div>
      )}
    </section>
  );
};

export default NoteListPage;
