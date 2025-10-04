import { db } from "@/db/drizzle";
import { account, session, user, verification } from "@/db/schema/auth-schema";
import { betterAuth, type BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, session, account, verification },
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // CACHE DURATION IN SECONDS
    },
  },
} satisfies BetterAuthOptions);
