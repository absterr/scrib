import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type UserRole = "owner" | "admin" | "editor";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
