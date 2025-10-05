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

const SkeletonRow = () => (
  <TableRow>
    <TableCell>
      <Skeleton className="w-92 h-4" />
    </TableCell>
    <TableCell>
      <Skeleton className="w-12 h-5" />
    </TableCell>
    <TableCell>
      <Skeleton className="w-24 h-5" />
    </TableCell>
    <TableCell>
      <Skeleton className="w-28 h-5" />
    </TableCell>
    <TableCell>
      <Skeleton className="w-10 h-10" />
    </TableCell>
  </TableRow>
);

const NoteListLoading = () => (
  <div className="max-w-7xl py-8 mx-auto px-4">
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
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonRow key={index} />
        ))}
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
