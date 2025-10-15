"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { cardDetails, details, tableSections } from "../details";
import PricingCard from "./PricingCard";
import PricingTable from "./PricingTable";

const PricingToggle = () => {
  const [bill, setBill] = useState<"Monthly" | "Yearly">("Monthly");
  const options: (typeof bill)[] = ["Monthly", "Yearly"];

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <fieldset
        role="radiogroup"
        aria-label="Billing cadence"
        className="p-1.5 rounded-3xl flex gap-2 bg-gray-200 text-sm font-semibold"
      >
        {options.map((opt) => (
          <label
            key={opt}
            className={cn(
              "rounded-3xl py-2 px-3 cursor-pointer transition-colors duration-300",
              bill === opt ? "bg-background text-foreground" : "text-gray-400"
            )}
          >
            <input
              type="radio"
              name="billing"
              value={opt}
              checked={bill === opt}
              onChange={() => setBill(opt)}
              className="sr-only"
            />
            {opt}
          </label>
        ))}
      </fieldset>

      <p className="pb-6 font-semibold text-neutral-400">
        <span className="text-neutral-700">Save 16%</span> on a yearly
        subscription
      </p>

      <div className="flex gap-8 pb-24">
        {cardDetails.map((detail) => (
          <PricingCard key={detail.name} cardDetail={detail} bill={bill} />
        ))}
      </div>

      <div className="py-36">
        <PricingTable
          details={details}
          bill={bill}
          tableSections={tableSections}
        />
      </div>
    </div>
  );
};

export default PricingToggle;
