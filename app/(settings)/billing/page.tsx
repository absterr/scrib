import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import BillingCard from "./_BillingCard";
import AlertMessage from "./AlertMessage";
import { type UserSubscriptionInfo } from "@/lib/utils";

const BillingPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ action?: string; status?: string }>;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user) redirect("/login");

  const { action, status } = await searchParams;
  const showAlert = !!status && !!action;

  const userInfo: UserSubscriptionInfo = {
    userId: session.user.id,
    email: session.user.email,
    currentPlan: session.user.plan,
    subscriptionId: session.user.stripeSubscriptionId,
    subscriptionStatus: session.user.subscriptionStatus,
  };

  const plans = [
    {
      name: "Monthly",
      price: "$12",
      interval: "month",
      description: "Cancel anytime",
    },
    {
      name: "Yearly",
      price: "$120",
      interval: "year",
      description: "Save 16%",
    },
  ];

  const visiblePlan =
    userInfo.currentPlan === "Hobby"
      ? plans
      : plans.filter((p) =>
          userInfo.currentPlan.toLowerCase().includes(p.name.toLowerCase())
        );

  return (
    <section className="max-w-2xs md:max-w-md lg:max-w-2xl mx-auto">
      {showAlert && <AlertMessage action={action} status={status} />}
      <div className="pt-16 md:pt-20 flex flex-col items-center gap-2 md:gap-4 lg:gap-8">
        <h1 className="font-bold text-lg md:text-2xl lg:text-3xl text-center">
          {userInfo.currentPlan === "Hobby"
            ? "Get access to pro features"
            : "You're subscribed to the pro plan"}
        </h1>
        {visiblePlan.map((p) => (
          <BillingCard plan={p} userInfo={userInfo} key={p.name} />
        ))}
        <Link
          href={"/pricing"}
          className="text-neutral-500 underline text-sm md:text-base pt-4 lg:pt-0"
        >
          See all plans and features
        </Link>
      </div>
    </section>
  );
};

export default BillingPage;
