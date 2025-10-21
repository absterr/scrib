"use client";
import { cn } from "@/lib/utils";
import { CreditCard, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const asideItems = [
  {
    title: "Account",
    url: "/account",
    icon: User,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: CreditCard,
  },
];

const SettingsAside = () => {
  const pathname = usePathname();
  return (
    <aside className="flex flex-col gap-14 px-6">
      <Link href={"/"}>
        <span className="italic font-bold text-xl px-1">Scrib</span>
      </Link>
      <div className="flex flex-col gap-8">
        {asideItems.map(({ title, url, icon: Icon }, i) => (
          <Link
            key={i}
            href={url}
            className={cn(
              "flex items-center gap-2 text-neutral-600 transition-all duration-100 font-semibold hover:text-foreground",
              {
                "text-foreground": pathname === url,
              }
            )}
          >
            <Icon className="h-5" />
            {title}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default SettingsAside;
