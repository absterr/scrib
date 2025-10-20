import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SkeletonRow = ({ className }: { className?: string }) => (
  <TableRow className={`${className}`}>
    <TableCell>
      <Skeleton className="w-64 md:w-72 lg:w-92 h-4" />
    </TableCell>
    <TableCell className="px-8 lg:px-0">
      <Skeleton className="w-12 h-5" />
    </TableCell>
    <TableCell className="px-8 lg:px-0">
      <Skeleton className="w-24 h-5" />
    </TableCell>
    <TableCell className="px-8 lg:px-0">
      <Skeleton className="w-28 h-5" />
    </TableCell>
    <TableCell className="px-8 lg:px-0">
      <Skeleton className="w-10 h-10" />
    </TableCell>
  </TableRow>
);

const NoteListLoading = () => (
  <div className="max-w-7xl py-8 mx-auto px-6">
    <div className="mb-8">
      <Skeleton className="h-10 w-56" />
    </div>
    <Table>
      <TableCaption>
        <div className="flex flex-col items-center">
          <Skeleton className="w-26 h-6" />
        </div>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Skeleton className="w-16 h-6" />
          </TableHead>
          <TableHead />
          <TableHead>
            <Skeleton className="w-32 h-6" />
          </TableHead>
          <TableHead>
            <Skeleton className="w-36 h-6" />
          </TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow className="hidden md:block" />
        <SkeletonRow className="hidden lg:block" />
        <TableRow>
          <TableCell>
            <Skeleton className="w-26 h-8" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
);

export default NoteListLoading;
