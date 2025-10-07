import { Button } from "@/components/ui/button";
import Link from "next/link";

const ActionButtons = () => (
  <div className="flex gap-4 justify-center pt-8">
    <Link href={"/signup"}>
      <Button className="rounded-3xl text-base py-6 border">Get started</Button>
    </Link>
    <Link href={"/pricing"}>
      <Button
        className="rounded-3xl text-base py-6 border bg-white border-neutral-400 shadow-none"
        variant={"secondary"}
      >
        See our plans
      </Button>
    </Link>
  </div>
);

export default ActionButtons;
