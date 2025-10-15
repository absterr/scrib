import sendMail from "@/actions/email";
import ChangeEmail from "@/components/email/ChangeEmail";
import EmailVerification from "@/components/email/EmailVerification";
import PasswordReset from "@/components/email/PasswordReset";
import { db } from "@/db/drizzle";
import { account, session, user, verification } from "@/db/schema/auth-schema";
import { render } from "@react-email/render";
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
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    maxPasswordLength: 32,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendMail({
        to: user.email,
        subject: "Reset your password",
        template: await render(PasswordReset(url)),
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const verificationUrl = url + "email-verified";
      await sendMail({
        to: user.email,
        subject: "Verify your email address",
        template: await render(EmailVerification(verificationUrl)),
      });
    },
  },
  socialProviders: {
    google: {
      enabled: true,
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url }) => {
        const verificationUrl = url + "email-verified";

        await sendMail({
          to: user.email,
          subject: "Email change requested",
          template: await render(ChangeEmail(newEmail)),
        });

        await sendMail({
          to: newEmail,
          subject: "Approve email change",
          template: await render(EmailVerification(verificationUrl)),
        });
      },
    },
    additionalFields: {
      plan: {
        type: ["Hobby", "Pro monthly", "Pro yearly"] as const,
        defaultValue: "Hobby",
        required: true,
      },
      stripeCustomerId: { type: "string", required: false },
      stripeSubscriptionId: { type: "string", required: false },
      subscriptionStatus: { type: "string", required: false },
      subscriptionExpiresAt: { type: "date", required: false },
    },
  },
} satisfies BetterAuthOptions);
