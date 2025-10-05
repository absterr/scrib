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

export const truncateTitle = (title: string) => {
  const maxLength = 22;
  const firstLineLength = 15;
  if (title.length <= maxLength) return title;

  const words = title.trim().split(/\s+/);
  let result = "";

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const next = result ? `${result} ${word}` : word;

    if (next.length > maxLength) {
      if (i === 0 && word.length > maxLength) {
        return word.slice(0, firstLineLength) + "...";
      }

      const remaining = maxLength - result.length - 4;

      if (remaining > 0) {
        const partial = word.slice(0, remaining);
        return result + " " + partial + "...";
      }

      return result + "...";
    }
    result = next;
  }
  return result;
};
