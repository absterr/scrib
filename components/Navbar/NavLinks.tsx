"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      <div>
        <Link href={"/"}>
          <span className="italic font-bold lg:text-lg px-1">Scrib</span>
        </Link>
      </div>
      <div className="flex gap-5 items-center">
        {pathname !== "/pricing" && (
          <Link
            href={"/pricing"}
            className="font-semibold text-sm lg:text-base hover:underline"
          >
            Pricing
          </Link>
        )}
        <Link
          href={"/login"}
          className="font-semibold text-sm lg:text-base hover:underline"
        >
          Log in
        </Link>
        <Link href={"/signup"}>
          <Button className="rounded-3xl text-sm lg:text-base py-5 lg:py-6 hover:cursor-pointer">
            Join for free
          </Button>
        </Link>
      </div>
    </>
  );
};

export default NavLinks;
