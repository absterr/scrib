"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import { Fragment } from "react";
import { type Detail, TableSection } from "@/lib/details";
import Link from "next/link";

const PlanHeader = ({
  detail,
  bill,
}: {
  detail: Detail;
  bill: "Monthly" | "Yearly";
}) => {
  const { name, button, variant, highlight } = detail;
  return (
    <th className={`p-4 ${highlight ? "bg-neutral-100 rounded-t-2xl" : ""}`}>
      <div className="space-y-3">
        <h3 className="flex flex-col gap-1">
          <span className="text-2xl">{name}</span>
          <span className="text-base font-semibold">
            {typeof detail.price === "string"
              ? detail.price
              : `${
                  bill === "Monthly"
                    ? detail.price.monthly
                    : detail.price.yearly
                } per mo`}
          </span>
        </h3>
        <Link href={name === "Pro" ? "/billing" : "/signup"}>
          <Button
            className="px-4 py-5 w-fit rounded-3xl cursor-pointer"
            variant={variant}
          >
            {button}
          </Button>
        </Link>
      </div>
    </th>
  );
};

const SectionHeader = ({ title }: { title: string }) => (
  <tr>
    <td className="pt-18 pb-4 pr-4 pl-0">
      <h4 className="text-xl font-bold">{title}</h4>
    </td>
    <td></td>
    <td className="bg-neutral-100"></td>
  </tr>
);

const FeatureRow = ({
  label,
  hobby,
  pro,
}: {
  label: string;
  hobby: string | React.ReactNode;
  pro: string | React.ReactNode;
}) => (
  <tr className="border-b border-b-neutral-300 last:border-none">
    <td className="p-3 pl-0">
      <h5 className="flex gap-1 items-center font-semibold">
        <span>{label}</span>
        <Info className="w-4 h-4" />
      </h5>
    </td>
    <td className="p-3 font-semibold text-gray-600">{hobby}</td>
    <td
      className={cn("p-3 font-semibold bg-neutral-100", {
        "rounded-b-2xl": label === "Scrib AI",
      })}
    >
      {pro}
    </td>
  </tr>
);

const PricingTable = ({
  details,
  bill,
  tableSections,
}: {
  details: Detail[];
  bill: "Monthly" | "Yearly";
  tableSections: TableSection[];
}) => (
  <table className="border-collapse table-fixed w-full">
    <colgroup>
      <col className="w-[40%]" />
      <col className="w-[30%]" />
      <col className="w-[30%]" />
    </colgroup>

    <thead className="text-left">
      <tr>
        <th className="flex p-4 pl-0">
          <h2 className="text-4xl font-bold">Compare plans &amp; features</h2>
        </th>
        {details.map((d, i) => (
          <PlanHeader key={i} detail={d} bill={bill} />
        ))}
      </tr>
    </thead>

    <tbody>
      {tableSections.map(({ title, rows }, i) => (
        <Fragment key={i}>
          <SectionHeader title={title} />
          {rows.map((row, j) => (
            <FeatureRow
              key={j}
              label={row.label}
              hobby={row.hobby}
              pro={row.pro}
            />
          ))}
        </Fragment>
      ))}
    </tbody>
  </table>
);

export default PricingTable;
