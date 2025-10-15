"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const ActionButton = ({ interval }: { interval: string }) => {
  const [pending, startTransition] = useTransition();
  const { data, isPending } = useSession();
  const router = useRouter();
  if (isPending) return <Skeleton className="h-10 w-18 rounded-3xl" />;
  if (!data || !data.user) return null;

  const userId = data.user.id;
  const email = data.user.email;
  const currentPlan = data.user.plan;
  const subscriptionId = data.user.stripeSubscriptionId;
  const subscriptionStatus = data.user.subscriptionStatus;

  // TODO: SET UP PLAN/PRICE IN STRIPE DASHBOARD
  const handleSelectPlan = () => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ email, interval, userId }),
        });

        const { url } = await res.json();
        if (url) {
          window.location.href = url;
        } else {
          toast.error("Failed to establish subscription session");
        }
      } catch (error) {
        toast.error("Unable to create checkout");
      }
    });
  };

  const handleCancelPlan = () => {
    startTransition(async () => {
      const res = await fetch("/api/stripe/cancel", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ subscriptionId }),
      });

      const { canceled } = await res.json();
      if (canceled) {
        router.replace("/billing");
        router.refresh();
        toast.success("Your subscription was successfully canceled");
      } else {
        toast.error("Failed to cancel subscription");
      }
    });
  };

  if (subscriptionStatus === "canceled" && currentPlan !== "Hobby") {
    return <Badge className="rounded-3xl p-2">Canceled</Badge>;
  }

  if (subscriptionStatus === "active" && currentPlan !== "Hobby") {
    return (
      <Button
        className="rounded-3xl py-5"
        variant={"destructive"}
        onClick={handleCancelPlan}
      >
        {pending ? <LoadingSpinner /> : "Cancel"}
      </Button>
    );
  }

  return (
    <Button
      disabled={pending}
      className="rounded-3xl py-5"
      onClick={handleSelectPlan}
    >
      {pending ? <LoadingSpinner /> : "Upgrade"}
    </Button>
  );
};

export default ActionButton;
