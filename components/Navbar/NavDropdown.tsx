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
            <DropdownMenuItem>
              <Link href={"/pricing"} className="font-semibold">
                Pricing
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Link href={"/login"} className="font-semibold">
              Log in
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/signup"}>
              <Button className="rounded-3xl text-sm md:text-base md:py-6 hover:cursor-pointer">
                Join for free
              </Button>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default NavDropdown;
