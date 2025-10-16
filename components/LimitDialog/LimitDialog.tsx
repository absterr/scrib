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

const LimitDialog = ({ children }: { children: React.ReactNode }) => (
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
              Upgrade to pro plan to get more benefits
            </DialogDescription>
          </div>
        </DialogHeader>
        <div>
          <PricingToggle />
        </div>
        <Link href={"/pricing"} className="text-neutral-500 underline">
          See all plans and features
        </Link>
      </div>
    </DialogContent>
  </Dialog>
);

export default LimitDialog;
