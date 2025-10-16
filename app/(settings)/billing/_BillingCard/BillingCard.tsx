import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ActionButton from "./ActionButton";
import { UserPlan } from "@/lib/utils";

interface Plan {
  name: string;
  price: string;
  interval: string;
  description: string;
}

const BillingCard = ({
  plan,
  currentPlan,
}: {
  plan: Plan;
  currentPlan: UserPlan;
}) => {
  const { name, price, interval, description } = plan;

  return (
    <Card className="w-full rounded-3xl shadow-none">
      <div className="flex justify-between items-center">
        <CardHeader className="w-full">
          <CardTitle>
            <h2 className="font-semibold text-2xl">{name}</h2>
            <strong className="text-4xl">{price}</strong>
            <span className="inline text-neutral-500"> /{interval}</span>
          </CardTitle>
          <p className="text-neutral-600">
            {interval === "month" ? "Billed monthly" : "Billed annually"}
            <br />
            {currentPlan === "Hobby" && description}
          </p>
        </CardHeader>
        <CardContent>
          <ActionButton interval={interval} />
        </CardContent>
      </div>
    </Card>
  );
};

export default BillingCard;
