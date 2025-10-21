import SettingsAside from "./SettingsAside";
import SettingsNav from "./SettingsNav";

export default function SettingsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row px-2 py-6">
      <div className="hidden md:block">
        <SettingsAside />
      </div>
      <div className="md:hidden">
        <SettingsNav />
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
}
