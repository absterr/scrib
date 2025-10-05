"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/lib/auth-client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
const Blocknote = dynamic(() => import("./Blocknote"), {
  ssr: false,
  loading: () => (
    <div className="mx-13">
      <Skeleton className="h-8 w-full" />
    </div>
  ),
});

const Editor = ({ roomId }: { roomId: string }) => {
  const { data, isPending } = useSession();
  const token = data?.session?.token;
  const WS_URL = process.env.NEXT_PUBLIC_WS_URL!;
  const docRef = useRef(new Y.Doc());
  const [provider, setProvider] = useState<WebsocketProvider | null>(null);
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    if (!token) return;
    const docRefCurrent = docRef.current;
    const wsProvider = new WebsocketProvider(WS_URL, roomId, docRef.current, {
      params: { token },
    });
    wsProvider.once("sync", (isSynced) => {
      if (isSynced) setSynced(isSynced);
    });
    setProvider(wsProvider);
    return () => {
      wsProvider?.destroy();
      docRefCurrent.destroy();
    };
  }, [token, roomId, WS_URL]);

  if (isPending || !provider || !synced)
    return <Skeleton className="h-8 w-full" />;
  if (!data || !data.session) return null;

  const userInfo = {
    name: data.user.name,
    email: data.user.email,
  };

  return (
    <Blocknote doc={docRef.current} provider={provider} userInfo={userInfo} />
  );
};

export default Editor;
