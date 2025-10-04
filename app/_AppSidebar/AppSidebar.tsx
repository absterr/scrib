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
import {
  Bot,
  Calendar,
  Home,
  Layout,
  NotebookTabs,
  Settings,
} from "lucide-react";
import SidebarClientButton from "./SidebarClientButton";
import UserNav from "./UserNav";

// TODO: Get this data from the session or fetch from DB
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
  {
    title: "Settings",
    url: "#",
    icon: <Settings />,
  },
];

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
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
        <UserNav />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
