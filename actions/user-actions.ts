"use server";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema/auth-schema";
import { getUserDetails } from "@/lib/queries";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const updateUserName = async (userId: string, newName: string) => {
  const currentUser = await getUserDetails(userId);
  if (!currentUser) return { success: false, message: "User not found" };

  try {
    await db.update(user).set({ name: newName }).where(eq(user.id, userId));
    revalidatePath("/");
    revalidatePath("/n");
    return { success: true, message: "Updated user name successfully" };
  } catch (error) {
    return { success: false, message: "An unexpected error occured" };
  }
};
