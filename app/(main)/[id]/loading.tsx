import { Skeleton } from "@/components/ui/skeleton";

const NoteLoading = () => (
  <div className="max-w-5xl py-24 mx-auto px-4">
    <Skeleton className="h-8 w-full" />
  </div>
);

export default NoteLoading;
