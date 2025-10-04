"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { signOut } from "@/lib/auth-client";
import { useToast } from "@/components/ui/use-toast";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      description: "Logging out...",
      variant: "default",
    });
    startTransition(async () => {
      try {
        await signOut({
          fetchOptions: {
            onSuccess: () => {
              router.replace("/login");
            },
          },
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        }
        toast({
          description: "Couldn't log out, please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={pending}
      className="flex items-center gap-2"
    >
      <LogOut />
      Log out
    </button>
  );
};

export default LogoutButton;
