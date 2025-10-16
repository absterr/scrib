import { UserPlan } from "@/lib/utils";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import PricingToggle from "./PricingToggle";
import { Button } from "../ui/button";

const LimitDialog = ({
  children,
  userPlan,
}: {
  children: React.ReactNode;
  userPlan: UserPlan;
}) => (
  <Dialog>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent>
      <div className="flex flex-col items-center px-10 py-6">
        <DialogHeader>
          <div className="flex flex-col gap-2 items-center pb-6">
            <DialogTitle className="font-bold">
              You have reached the limit of your plan
            </DialogTitle>
            <DialogDescription>
              {userPlan === "Hobby"
                ? "Upgrade to pro plan to get more benefits"
                : "You have reached the limits of your pro plan"}
            </DialogDescription>
          </div>
        </DialogHeader>
        <div>
          {userPlan === "Hobby" ? (
            <PricingToggle />
          ) : (
            <div className="pb-4">
              <Button className="rounded-3xl p-5">Contact sales</Button>
            </div>
          )}
        </div>
        <Link href={"/pricing"} className="text-neutral-500 underline">
          See all plans and features
        </Link>
      </div>
    </DialogContent>
  </Dialog>
);

export default LimitDialog;
