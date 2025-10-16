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
    <TableCaption>
      COUNT: <span className="font-semibold">{notes.length}</span>
    </TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="font-semibold text-neutral-600 text-base">
          Title
        </TableHead>
        <TableHead></TableHead>
        <TableHead className="font-semibold text-neutral-600 text-base">
          Created by
        </TableHead>
        <TableHead className="font-semibold text-neutral-600 text-base">
          Last updated at
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {notes.map(async (note) => {
        return (
          <TableRow className="group" key={note.id}>
            <TableCell>{note.title}</TableCell>
            <TableCell>
              <Link
                href={`${note.id}`}
                className="text-xs py-1 px-2 mx-1 w-fit rounded-md text-center  text-white bg-neutral-300 hover:bg-neutral-500 invisible group-hover:visible transition-transform"
              >
                Open
              </Link>
            </TableCell>
            <TableCell>{note.owner}</TableCell>
            <TableCell>{formatDate(note.updatedAt)}</TableCell>
            <TableCell>
              {note.ownerId === userId && (
                <div className="invisible group-hover:visible">
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
