import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const NotFoundPage = () => (
  <section className="w-full min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center">
    <div className="flex justify-center gap-8">
      <div className="flex flex-col justify-center">
        <h1 className="text-6xl mb-0">404</h1>
      </div>
      <div className="border border-neutral-600"></div>
      <div className="space-y-5">
        <div className="space-y-1">
          <h2 className="font-semibold text-4xl">Oops!</h2>
          <p className="text-neutral-500 text-base">
            We could not find the page you are looking for
          </p>
        </div>
        <Link href={"/"}>
          <Button>
            <ArrowLeft />
            Go to home
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

export default NotFoundPage;
