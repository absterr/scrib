import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ChatWrapper from "./_ChatWrapper";

const ChatPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user) redirect("/login");
  if (session.user.plan === "Hobby") redirect("/billing");

  return (
    <section className="max-w-xs md:max-w-lg lg:max-w-3xl mx-auto px-2">
      <ChatWrapper />
    </section>
  );
};

export default ChatPage;
