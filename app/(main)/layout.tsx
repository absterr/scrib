import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "../_AppSidebar";
import CustomTrigger from "../CustomTrigger";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1">
          <CustomTrigger />
          <main>{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
