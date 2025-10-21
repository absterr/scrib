"use client";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const NavDropdown = () => {
  const pathname = usePathname();

  return (
    <>
      <Link href={"/"}>
        <span className="italic font-bold px-1">Scrib</span>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-2xl p-3 flex flex-col gap-3">
          {pathname !== "/pricing" && (
            <Link href={"/pricing"}>
              <DropdownMenuItem className="font-semibold">
                Pricing
              </DropdownMenuItem>
            </Link>
          )}
          <Link href={"/login"}>
            <DropdownMenuItem className="font-semibold">
              Log in
            </DropdownMenuItem>
          </Link>
          <Link href={"/signup"}>
            <DropdownMenuItem>
              <Button className="rounded-3xl text-sm md:text-base md:py-6 hover:cursor-pointer">
                Join for free
              </Button>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default NavDropdown;
