"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Bot, Calendar, Home, Layout, NotebookTabs } from "lucide-react";
import SidebarClientButton from "./SidebarClientButton";
import UserNav from "./UserNav";
import { type UserPlan } from "@/lib/utils";

const menuItems = [
  {
    title: "Home",
    url: "/",
    icon: <Home />,
  },
  {
    title: "Notes",
    url: "/n",
    icon: <NotebookTabs />,
  },
  {
    title: "Scrib chat",
    url: "/chat",
    icon: <Bot />,
  },
  {
    title: "Calendar",
    url: "#",
    icon: <Calendar />,
  },
  {
    title: "Templates",
    url: "#",
    icon: <Layout />,
  },
];

interface SidebarProps extends React.ComponentProps<typeof Sidebar> {
  userInfo: {
    name: string;
    email: string;
    image: string | null | undefined;
    plan: UserPlan;
  };
}

const AppSidebar = ({ userInfo, ...props }: SidebarProps) => {
  return (
    <Sidebar className="text-black" {...props}>
      <SidebarContent>
        <SidebarGroup className="space-y-4">
          <SidebarGroupLabel>
            <h2 className="font-semibold text-lg">Scrib</h2>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
              {menuItems.map((item) => (
                <SidebarClientButton key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserNav userInfo={userInfo} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
