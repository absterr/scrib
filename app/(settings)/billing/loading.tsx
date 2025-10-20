import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const BillingLoading = () => (
  <div className="max-w-2xl mx-auto">
    <div className="pt-20 flex flex-col items-center gap-8">
      <Skeleton className="h-9 w-98" />
      <Skeleton className="w-full rounded-3xl h-40" />
      <Link href={"/pricing"} className="text-neutral-500 underline">
        See all plans and features
      </Link>
    </div>
  </div>
);

export default BillingLoading;
