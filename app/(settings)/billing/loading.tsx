import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const BillingLoading = () => (
  <div className="max-w-xs md:max-w-md lg:max-w-2xl mx-auto">
    <div className="pt-16 md:pt-20 flex flex-col items-center gap-8">
      <div className="md:pb-2 lg:pb-6">
        <Skeleton className="h-7 md:h-9 w-62 md:w-98" />
      </div>
      <Skeleton className="w-full rounded-3xl h-32 md:h-36 lg:h-40" />
      <Link
        href={"/pricing"}
        className="text-neutral-500 underline text-sm md:text-base"
      >
        See all plans and features
      </Link>
    </div>
  </div>
);

export default BillingLoading;
