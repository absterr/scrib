"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const { data, isPending } = useSession();
  const pathname = usePathname();

  // TODO: ADD THE THEME SWITCH WHERE 'null' IS

  return (
    <nav className="max-w-xl w-full h-fit bg-neutral-200 rounded-4xl flex justify-between items-center px-4 py-2 gap-8 min-h-14">
      <Link href={"/"}>
        <span className="italic font-bold text-lg px-1">Scrib</span>
      </Link>
      <div className="flex gap-5 items-center">
        {pathname !== "/pricing" && (
          <Link href={"/pricing"} className="font-semibold hover:underline">
            Pricing
          </Link>
        )}
        {!isPending && (!data || !data.user) ? (
          <>
            <Link href={"/login"} className="font-semibold hover:underline">
              Log in
            </Link>
            <Link href={"/signup"}>
              <Button className="rounded-3xl text-base py-6 hover:cursor-pointer">
                Join for free
              </Button>
            </Link>
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
