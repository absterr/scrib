import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const AccountPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user) redirect("/login");

  return <section></section>;
};

export default AccountPage;
