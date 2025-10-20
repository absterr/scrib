import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import AppSidebar from "../_AppSidebar";
import CustomTrigger from "../CustomTrigger";

export default async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
    return (
      <div className="w-full h-screen grid grid-rows-[auto, 1fr]">
        <div className="flex justify-center py-6">
          <Navbar />
        </div>
        <main className="overflow-y-auto scroll-smooth flex-1">{children}</main>
      </div>
    );

  const userInfo = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
    plan: session.user.plan,
  };

  return (
    <div className="flex overflow-hidden w-full h-full">
      <SidebarProvider>
        <AppSidebar userInfo={userInfo} />
        <div className="flex-1">
          <CustomTrigger />
          <main>{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
