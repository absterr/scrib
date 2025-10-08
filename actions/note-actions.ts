"use server";
import InviteUser from "@/components/email/InviteUser";
import { db } from "@/db/drizzle";
import {
  note,
  noteCollaborator,
  noteEmbedding,
  noteInvite,
  noteVersion,
} from "@/db/schema/note-schema";
import { checkCollaborationBeforeInvite } from "@/lib/queries";
import { UserRole } from "@/lib/utils";
import { render } from "@react-email/render";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import sendMail from "./email";

const removeUUIDHyphens = sql<string>`REPLACE(${note.id}::text, '-', '')`.as(
  "id"
);

// POST

export const createNote = async (ownerId: string) => {
  const [newNote] = await db
    .insert(note)
    .values({ ownerId })
    .returning({ id: removeUUIDHyphens });

  if (newNote) {
    await db
      .insert(noteCollaborator)
      .values({ noteId: newNote.id, userId: ownerId, role: "owner" });
  }

  return newNote;
};

export const createNewVersion = async (noteId: string) => {
  const [currentNote] = await db
    .select()
    .from(note)
    .where(eq(note.id, noteId))
    .limit(1);

  if (currentNote)
    await db.insert(noteVersion).values({
      noteId,
      content: currentNote.content,
      createdBy: currentNote.ownerId,
    });
};

export const inviteUser = async (
  sender: string,
  senderEmail: string,
  receiverEmail: string,
  noteId: string,
  noteTitle: string
) => {
  const collaborator = await checkCollaborationBeforeInvite(
    receiverEmail,
    noteId
  );
  if (collaborator) {
    return { success: false, error: "This user is already a member" };
  }

  const [{ token }] = await db
    .insert(noteInvite)
    .values({ receiverEmail, senderEmail })
    .returning({ token: noteInvite.token });

  if (token) {
    const inviteUrl = `${process.env.BETTER_AUTH_URL!}/invite/${noteId}?token=${token}`;
    await sendMail({
      to: receiverEmail,
      subject: "You have been invited",
      template: await render(InviteUser(inviteUrl, sender, noteTitle)),
    });

    return { success: true };
  }

  return { success: false, error: "Failed query or couldn't send mail" };
};

export const addCollaborator = async (noteId: string, userId: string) => {
  await db.insert(noteCollaborator).values({ noteId, userId, role: "editor" });
  revalidatePath(`/${noteId}`);
};

// PUT | PATCH

export const changeUserRole = async (
  userId: string,
  noteId: string,
  newRole: UserRole
) => {
  await db
    .update(noteCollaborator)
    .set({ role: newRole })
    .where(
      and(
        eq(noteCollaborator.userId, userId),
        eq(noteCollaborator.noteId, noteId)
      )
    );
  revalidatePath(`/${noteId}`);
};

// DELETE

export const removeInvite = async (userEmail: string) => {
  await db.delete(noteInvite).where(eq(noteInvite.receiverEmail, userEmail));
};

export const removeCollaborator = async (noteId: string, userId: string) => {
  await db
    .delete(noteCollaborator)
    .where(
      and(
        eq(noteCollaborator.noteId, userId),
        eq(noteCollaborator.userId, noteId)
      )
    );
  revalidatePath(`/${noteId}`);
};

export const deleteNote = async (noteId: string) => {
  await db.delete(noteCollaborator).where(eq(noteCollaborator.noteId, noteId));
  await db.delete(noteEmbedding).where(eq(noteEmbedding.noteId, noteId));
  await db.delete(note).where(eq(note.id, noteId));
  revalidatePath("/n");
  revalidatePath("/");
};
