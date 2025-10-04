"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { MenuIcon } from "lucide-react";

const CustomTrigger = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <button onClick={toggleSidebar}>
      <MenuIcon className="p-2 hover:opacity-30 rounded-md" size={40} />
    </button>
  );
};

export default CustomTrigger;
