import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import DeleteNoteDialog from "./DeleteNoteDialog";
import NewNoteButton from "../NewNoteButton";
import { formatDate, UserPlan } from "@/lib/utils";

const CustomTable = ({
  notes,
  userId,
  userPlan,
  maxNotesReached,
}: {
  notes: {
    id: string;
    owner: string;
    ownerId: string;
    title: string;
    updatedAt: Date;
  }[];
  userId: string;
  userPlan: UserPlan;
  maxNotesReached: boolean;
}) => (
  <Table>
    <TableCaption className="pb-6">
      COUNT: <span className="font-semibold">{notes.length}</span>
    </TableCaption>
    <TableHeader className="sticky top-0 z-10">
      <TableRow>
        <TableHead className="font-semibold text-neutral-600 text-base">
          Title
        </TableHead>
        <TableHead></TableHead>
        <TableHead className="font-semibold text-neutral-600 text-base px-8 lg:px-0">
          Created by
        </TableHead>
        <TableHead className="font-semibold text-neutral-600 text-base px-8 lg:px-0">
          Last updated at
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {notes.map(async (note) => {
        return (
          <TableRow className="group" key={note.id}>
            <TableCell>{note.title}</TableCell>
            <TableCell className="px-8 lg:px-0">
              <Link
                href={`${note.id}`}
                className="text-xs py-2 px-3 mx-1 w-fit rounded-xl text-center text-white bg-neutral-300 hover:bg-neutral-500 lg:invisible group-hover:visible transition-transform"
              >
                Open
              </Link>
            </TableCell>
            <TableCell className="px-8 lg:px-0">{note.owner}</TableCell>
            <TableCell className="px-8 lg:px-0">
              {formatDate(note.updatedAt)}
            </TableCell>
            <TableCell className="px-8 lg:px-0">
              {note.ownerId === userId && (
                <div className="lg:invisible group-hover:visible">
                  <DeleteNoteDialog noteId={note.id} />
                </div>
              )}
            </TableCell>
          </TableRow>
        );
      })}
      <TableRow>
        <TableCell colSpan={5}>
          <NewNoteButton
            userId={userId}
            userPlan={userPlan}
            maxNotesReached={maxNotesReached}
          />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export default CustomTable;
