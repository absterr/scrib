"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { type CardDetail } from "@/lib/details";

interface Props {
  cardDetail: CardDetail;
  bill: "Monthly" | "Yearly";
}

const PricingCard = ({
  cardDetail: { name, price, description, features, extra },
  bill,
}: Props) => (
  <div
    key={name}
    className={cn("flex flex-col gap-6 p-4 border rounded-3xl max-w-xs", {
      "bg-neutral-100": name === "Pro",
    })}
  >
    <div className="text-left space-y-2">
      <h3 className="text-2xl font-bold">{name}</h3>
      <div
        className={cn(
          "flex gap-1",
          name === "Pro" ? "items-center" : "items-end"
        )}
      >
        <h3 className="text-4xl font-bold">
          {name === "Hobby"
            ? price
            : bill === "Monthly"
              ? price.monthly
              : price.yearly}
        </h3>
        {name === "Hobby" ? (
          <p className="text-sm text-gray-500">Free</p>
        ) : (
          <span className="flex flex-col">
            <p className="text-xs text-gray-500">per month</p>
            <p className="text-xs text-gray-500">
              billed {bill === "Monthly" ? "monthly" : "annually"}
            </p>
          </span>
        )}
      </div>
      <p>{description}</p>
    </div>
    <div>
      <Button
        className="w-full rounded-3xl py-6"
        variant={name === "Pro" ? "outline" : "default"}
      >
        {name === "Pro" ? "Get started" : "Join for free"}
      </Button>
    </div>
    <div className="text-left">
      <ul className="text-neutral-500 space-y-2">
        {features.map((f) => (
          <li key={f} className="font-semibold flex items-center gap-2">
            <Check />
            {f}
          </li>
        ))}
      </ul>
    </div>
    <div className="p-4 bg-neutral-200 rounded-2xl text-center">
      <p className="font-semibold">{extra}</p>
    </div>
  </div>
);

export default PricingCard;
