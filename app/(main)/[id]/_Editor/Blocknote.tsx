"use client";
import { stringToColor } from "@/lib/utils";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { type WebsocketProvider } from "y-websocket";
import { type Doc } from "yjs";

const Blocknote = ({
  doc,
  provider,
  userInfo,
}: {
  doc: Doc;
  provider: WebsocketProvider;
  userInfo: { name: string; email: string };
}) => {
  const editor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-info"),
      user: {
        name: userInfo.name,
        color: stringToColor(userInfo.email),
      },
    },
  });

  return <BlockNoteView editor={editor} theme="light" />;
};

export default Blocknote;
