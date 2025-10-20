import { Skeleton } from "@/components/ui/skeleton";

const ChatLoading = () => (
  <div className="max-w-xs md:max-w-lg lg:max-w-3xl px-2 mx-auto flex flex-col justify-center min-h-[calc(100vh-14rem)]">
    <Skeleton className="w-full h-12 rounded-3xl" />
  </div>
);

export default ChatLoading;
