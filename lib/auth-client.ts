import { createAuthClient } from "better-auth/react";
export const {
  signUp,
  signIn,
  signOut,
  forgetPassword,
  resetPassword,
  useSession,
} = createAuthClient();
