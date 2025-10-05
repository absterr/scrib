import { auth } from "@/lib/auth";
import { checkCollaborator, checkNote, getCollaborators } from "@/lib/queries";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Editor from "./_Editor";
import Manage from "./_Manage";

const NotePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user) redirect("/login");

  const { id } = await params;

  const foundNote = await checkNote(id);
  if (!foundNote) notFound();

  const userId = session.user.id;
  const username = session.user.name;
  const userEmail = session.user.email;

  const { role } = await checkCollaborator(userId, id);
  if (!role)
    return (
      <div className="py-24 mx-auto px-4 text-center">
        <h2 className="text-xl text-neutral-800 font-semibold">
          You do not have access to this note.
        </h2>
      </div>
    );

  const collaborators = await getCollaborators(id);

  return (
    <section>
      <div className="fixed top-2 right-6 z-50 text-sm">
        <Manage
          noteId={id}
          noteTitle={foundNote.title}
          users={collaborators}
          currentUserId={userId}
          currentUsername={username}
          currentUserEmail={userEmail}
          currentUserRole={role}
        />
      </div>
      <div className="max-w-5xl py-24 mx-auto px-4">
        <Editor roomId={id} />
      </div>
    </section>
  );
};

export default NotePage;
