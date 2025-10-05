import { auth } from "@/lib/auth";
import { checkCollaborator, checkNote } from "@/lib/queries";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

const NotePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user) redirect("/login");

  const { id } = await params;

  const foundNote = await checkNote(id);
  if (!foundNote) notFound();

  const userId = session.user.id;

  const { role } = await checkCollaborator(userId, id);
  if (!role)
    return (
      <div className="py-24 mx-auto px-4 text-center">
        <h2 className="text-xl text-neutral-800 font-semibold">
          You do not have access to this note.
        </h2>
      </div>
    );

  return <section></section>;
};

export default NotePage;
