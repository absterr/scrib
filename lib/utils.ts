import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type UserRole = "owner" | "admin" | "editor";
export type UserPlan = "Hobby" | "Pro monthly" | "Pro yearly";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFirstName = (fullname: string) => {
  const names = fullname.trim().split(/\s+/)[0];
  const firstName = names.charAt(0).toUpperCase() + names.slice(1);
  return firstName;
};

export const formatDate = (noteDate: Date) => {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  const time = noteDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const isToday = noteDate.toDateString() === now.toDateString();
  const isYesterday = noteDate.toDateString() === yesterday.toDateString();

  if (isToday) {
    return `Today, ${time}`;
  }
  if (isYesterday) {
    return `Yesterday, ${time}`;
  }

  const isThisYear = noteDate.getFullYear() === now.getFullYear();
  const dateWithoutYear = noteDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const dateWithYear = noteDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (isThisYear) {
    return `${dateWithoutYear}, ${time}`;
  }

  return `${dateWithYear}, ${time}`;
};

export const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return "#" + "00000".substring(0, 6 - c.length) + c;
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
