"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SettingsNav = () => {
  const pathname = usePathname();
  const navItems = [
    {
      title: "Account",
      url: "/account",
    },
    {
      title: "Billing",
      url: "/billing",
    },
  ];

  return (
    <nav className="flex flex-col items-center">
      <div>
        <h1 className="font-bold text-2xl">Settings</h1>
      </div>
      <div className="flex gap-8">
        {navItems.map(({ title, url }) => (
          <div key={title} className="relative">
            <Link
              href={url}
              className={cn(
                "font-semibold text-lg pb-1.5 transition-colors duration-200",
                pathname === url
                  ? "text-foreground"
                  : "text-neutral-500 hover:text-foreground"
              )}
            >
              {title}
            </Link>
            <span
              className={cn(
                "absolute left-0 bottom-0 h-[2px] bg-foreground transition-all duration-200 ease-in-out",
                pathname === url ? "w-full opacity-100" : "w-0 opacity-0"
              )}
            ></span>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default SettingsNav;
