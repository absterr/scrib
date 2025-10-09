import Navbar from "@/components/Navbar";

export default function LeadLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen grid grid-rows-[auto, 1fr]">
      <div className="flex justify-center py-6">
        <Navbar />
      </div>
      <main className="overflow-y-auto scroll-smooth flex-1">{children}</main>
    </div>
  );
}
