import "server-only";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema/auth-schema";
import { note, noteCollaborator, noteInvite } from "@/db/schema/note-schema";
import { and, count, desc, eq, sql } from "drizzle-orm";

const removeUUIDHyphens = sql<string>`REPLACE(${note.id}::text, '-', '')`.as(
  "id"
);

export const checkCollaborator = async (userId: string, noteId: string) => {
  const [collaboration] = await db
    .select({ role: noteCollaborator.role })
    .from(noteCollaborator)
    .where(
      and(
        eq(noteCollaborator.noteId, noteId),
        eq(noteCollaborator.userId, userId)
      )
    )
    .limit(1);

  return collaboration;
};

export const checkCollaborationBeforeInvite = async (
  receiverEmail: string,
  noteId: string
) => {
  const [foundUser] = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.email, receiverEmail));

  if (!foundUser) return foundUser;

  const [collaborator] = await db
    .select({ email: user.email, noteId: noteCollaborator.noteId })
    .from(noteCollaborator)
    .innerJoin(user, eq(user.email, receiverEmail))
    .where(
      and(
        eq(noteCollaborator.noteId, noteId),
        eq(noteCollaborator.userId, foundUser.id)
      )
    )
    .limit(1);

  return collaborator;
};

export const checkNote = async (noteId: string) => {
  const [foundNote] = await db
    .select({ title: note.title })
    .from(note)
    .where(eq(note.id, noteId))
    .limit(1);

  return foundNote;
};

export const checkUserToken = async (userToken: string) => {
  const [{ token }] = await db
    .select({ token: noteInvite.token })
    .from(noteInvite)
    .where(eq(noteInvite.token, userToken))
    .limit(1);

  return token;
};

export const getCollaborators = async (noteId: string) => {
  const collaborators = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      role: noteCollaborator.role,
    })
    .from(noteCollaborator)
    .innerJoin(user, eq(user.id, noteCollaborator.userId))
    .where(eq(noteCollaborator.noteId, noteId));

  return collaborators;
};

export const getUserDetails = async (userId: string) => {
  const [currentUser] = await db
    .select({ name: user.name, email: user.email, image: user.image })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  return currentUser;
};

export const getUserCollaborationsNotes = async (userId: string) => {
  const collaborationNotes = await db
    .select({
      id: removeUUIDHyphens,
      ownerId: note.ownerId,
      title: note.title,
      updatedAt: note.updatedAt,
      owner: user.name,
    })
    .from(noteCollaborator)
    .innerJoin(note, eq(note.id, noteCollaborator.noteId))
    .innerJoin(user, eq(user.id, note.ownerId))
    .where(eq(noteCollaborator.userId, userId))
    .orderBy(desc(note.updatedAt));

  return collaborationNotes;
};

export const getUserOwnedNotesCount = async (userId: string) => {
  const [noteCount] = await db
    .select({ count: count() })
    .from(note)
    .where(eq(note.ownerId, userId));

  return noteCount;
};

export const getUserRecentNotes = async (userId: string) => {
  const recentNotes = await db
    .select({
      id: removeUUIDHyphens,
      title: note.title,
      updatedAt: note.updatedAt,
    })
    .from(noteCollaborator)
    .innerJoin(note, eq(note.id, noteCollaborator.noteId))
    .where(eq(noteCollaborator.userId, userId))
    .orderBy(desc(note.updatedAt))
    .limit(8);

  return recentNotes;
};
