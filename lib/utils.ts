import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type UserRole = "owner" | "admin" | "editor";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFirstName = (fullname: string) => {
  const names = fullname.trim().split(/\s+/)[0];
  const firstName = names.charAt(0).toUpperCase() + names.slice(1);
  return firstName;
};
