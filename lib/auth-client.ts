import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const {
  signUp,
  signIn,
  signOut,
  forgetPassword,
  resetPassword,
  useSession,
  changeEmail,
} = createAuthClient({
  plugins: [
    inferAdditionalFields({
      user: {
        plan: {
          type: ["Hobby", "Pro monthly", "Pro yearly"] as const,
          required: true,
          defaultValue: "Hobby",
        },
        stripeSubscriptionId: {
          type: "string",
          required: false,
        },
        subscriptionStatus: {
          type: "string",
          required: false,
        },
      },
    }),
  ],
});
