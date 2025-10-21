import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserSubscriptionInfo } from "@/lib/utils";
import ActionButton from "./ActionButton";

interface Plan {
  name: string;
  price: string;
  interval: string;
  description: string;
}

const BillingCard = ({
  plan,
  userInfo,
}: {
  plan: Plan;
  userInfo: UserSubscriptionInfo;
}) => {
  const { name, price, interval, description } = plan;

  return (
    <Card className="w-full rounded-3xl shadow-none">
      <div className="flex justify-between items-center">
        <CardHeader className="w-full">
          <CardTitle>
            <h2 className="font-semibold md:text-lg lg:text-2xl">{name}</h2>
            <strong className="text-3xl lg:text-4xl">{price}</strong>
            <span className="inline text-neutral-500 text-sm lg:text-base">
              {" "}
              /{interval}
            </span>
          </CardTitle>
          <p className="text-neutral-600 text-sm lg:text-base">
            {interval === "month" ? "Billed monthly" : "Billed annually"}
            <br />
            {userInfo.currentPlan === "Hobby" && description}
          </p>
        </CardHeader>
        <CardContent>
          <ActionButton interval={interval} userInfo={userInfo} />
        </CardContent>
      </div>
    </Card>
  );
};

export default BillingCard;
