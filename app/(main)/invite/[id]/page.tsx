import { addCollaborator, removeInvite } from "@/actions/note-actions";
import { auth } from "@/lib/auth";
import { checkCollaborator, checkNote, checkUserToken } from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token?: string }>;
}

const InvitePage = async ({ params, searchParams }: Props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user) redirect("/login");

  const { id } = await params;
  const userToken = (await searchParams).token;

  const foundNote = await checkNote(id);
  if (!foundNote || !userToken) notFound();

  const token = await checkUserToken(userToken);
  if (!token) {
    return (
      <div className="py-24 mx-auto px-4 text-center">
        <h2 className="text-xl text-neutral-800 font-semibold">
          This token is invalid or has expired
        </h2>
      </div>
    );
  }

  const userId = session.user.id;
  const userEmail = session.user.email;
  const { role } = await checkCollaborator(userId, id);
  if (role) {
    await removeInvite(userEmail);
    return (
      <div className="py-24 mx-auto px-4 text-center flex flex-col gap-6 items-center">
        <h2 className="text-xl text-neutral-800 font-semibold">
          You&apos;re already a member of this note
        </h2>

        <Link href={`/${id}`}>
          <Button>Go to note</Button>
        </Link>
      </div>
    );
  }

  await addCollaborator(id, userId);
  await removeInvite(userEmail);

  return (
    <div className="py-24 mx-auto px-4 text-center flex flex-col gap-6 items-center">
      <h2 className="text-xl text-neutral-800 font-semibold">
        You&apos;ve been successfully added
      </h2>
      <Link href={`/${id}`}>
        <Button>Go to note</Button>
      </Link>
    </div>
  );
};

export default InvitePage;
