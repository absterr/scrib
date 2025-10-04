"use client";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  item: {
    title: string;
    url: string;
    icon: React.ReactNode;
  };
}

const SidebarClientButton = ({ item: { title, url, icon } }: Props) => {
  const pathname = usePathname();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={pathname === url} asChild className="p-4">
        <Link href={url}>
          {icon}
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
export default SidebarClientButton;
