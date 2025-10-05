import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ChatWrapper from "./_ChatWrapper";

const ChatPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user) redirect("/login");

  return (
    <section className="max-w-3xl mx-auto">
      <ChatWrapper />
    </section>
  );
};

export default ChatPage;
