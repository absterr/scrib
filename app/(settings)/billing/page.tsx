import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import BillingCard from "./_BillingCard";
import AlertMessage from "./AlertMessage";

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

  const userPlan = session.user.plan;

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
    userPlan === "Hobby"
      ? plans
      : plans.filter((p) =>
          userPlan.toLowerCase().includes(p.name.toLowerCase())
        );

  return (
    <>
      <section className="max-w-2xl mx-auto">
        {showAlert && <AlertMessage action={action} status={status} />}
        <div className="pt-20 flex flex-col items-center gap-8">
          <h1 className="font-bold text-3xl text-center">
            {userPlan === "Hobby"
              ? "Get access to pro features"
              : "You're subscribed to the pro plan"}
          </h1>
          {visiblePlan.map((p) => (
            <BillingCard plan={p} currentPlan={userPlan} key={p.name} />
          ))}
          <Link href={"/pricing"} className="text-neutral-500 underline">
            See all plans and features
          </Link>
        </div>
      </section>
    </>
  );
};

export default BillingPage;
