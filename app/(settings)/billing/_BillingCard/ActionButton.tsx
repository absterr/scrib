"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserSubscriptionInfo } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const ActionButton = ({
  interval,
  userInfo,
}: {
  interval: string;
  userInfo: UserSubscriptionInfo;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { userId, email, currentPlan, subscriptionId, subscriptionStatus } =
    userInfo;

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
        disabled={isPending}
        onClick={handleCancelPlan}
      >
        {isPending ? <LoadingSpinner /> : "Cancel"}
      </Button>
    );
  }

  return (
    <Button
      className="rounded-3xl py-5"
      disabled={isPending}
      onClick={handleSelectPlan}
    >
      {isPending ? <LoadingSpinner /> : "Upgrade"}
    </Button>
  );
};

export default ActionButton;
