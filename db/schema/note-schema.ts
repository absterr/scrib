import crypto from "crypto";
import { sql } from "drizzle-orm";
import {
  bigserial,
  customType,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
  vector,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

const bytea = customType<{
  data: Uint8Array<ArrayBufferLike>;
  notNull: true;
  default: true;
}>({
  dataType() {
    return "bytea";
  },
  toDriver(value) {
    return value;
  },
  fromDriver(value) {
    return new Uint8Array<ArrayBufferLike>(value as ArrayBufferLike);
  },
});

const userRoleEnum = pgEnum("user_role", ["owner", "admin", "editor"]);

export const note = pgTable("note", {
  id: uuid("id").primaryKey().defaultRandom(),
  ownerId: text("owner_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull().default("Untitled"),
  content: bytea("content")
    .notNull()
    .default(sql`'\\x'`),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const noteVersion = pgTable("note_version", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  noteId: uuid("note_id")
    .notNull()
    .references(() => note.id, { onDelete: "cascade" }),
  content: bytea("content")
    .notNull()
    .default(sql`'\\x'`),
  createdBy: text("created_by")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const noteCollaborator = pgTable(
  "note_collaborator",
  {
    noteId: uuid("note_id")
      .notNull()
      .references(() => note.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    role: userRoleEnum("role").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.noteId, table.userId] }),
    uniqueIndex("unique_note_owner")
      .on(table.noteId)
      .where(sql`${table.role} = 'owner'`),
  ]
);

export const noteInvite = pgTable("note_invite", {
  id: uuid("id").primaryKey().defaultRandom(),
  receiverEmail: text("receiver_email").notNull(),
  senderEmail: text("sender_email").notNull(),
  token: varchar("token", { length: 64 })
    .unique()
    .notNull()
    .$defaultFn(() => crypto.randomBytes(32).toString("base64url")),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  expiresAt: timestamp("expires_at")
    .notNull()
    .default(sql`now() + interval '7 days'`),
});

export const noteEmbedding = pgTable("note_embedding", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  noteId: uuid("note_id")
    .notNull()
    .references(() => note.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  embedding: vector("embedding", { dimensions: 1536 }),
  metadata: jsonb("metadata").$type<Record<string, any>>(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
