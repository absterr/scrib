import SettingsNav from "./SettingsNav";

export default function SettingsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full h-screen flex px-2 py-6">
      <SettingsNav />
      <main className="flex-1">{children}</main>
    </div>
  );
}
