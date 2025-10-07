"use client";
import { signOut } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const LogoutButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    const logout = toast.loading("Logging out...");
    startTransition(async () => {
      try {
        await signOut({
          fetchOptions: {
            onSuccess: () => {
              router.replace("/login");
              toast.dismiss(logout);
            },
          },
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        }
        toast.error("Couldn't log out, please try again.");
      }
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="flex items-center gap-2"
    >
      <LogOut />
      Log out
    </button>
  );
};

export default LogoutButton;
