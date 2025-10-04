import { Button } from "@/components/ui/button";
import Link from "next/link";

const EmailVerifiedPage = () => {
  return (
    <section className="flex flex-col items-center h-screen mt-64">
      <h1 className="mb-2 text-2xl font-bold text-black">Email verified</h1>
      <p className="text-gray-600">Your email has been successfully verified</p>
      <Button className="mt-6">
        <Link href={"/"}>Go to home</Link>
      </Button>
    </section>
  );
};

export default EmailVerifiedPage;
