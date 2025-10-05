"use client";
import { useChat } from "@ai-sdk/react";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { cn } from "@/lib/utils";

const ChatWrapper = () => {
  const { messages, sendMessage } = useChat();
  const hasMessages = messages.length > 0;

  return (
    <div
      className={cn("h-full", {
        "grid grid-rows-[1fr_auto] h-[92vh]": hasMessages,
        "flex flex-col items-center justify-center h-[78vh]": !hasMessages,
      })}
    >
      {hasMessages ? (
        <Messages messages={messages} />
      ) : (
        <h2 className="font-semibold text-3xl mb-8 text-center">
          What can I help you with?
        </h2>
      )}
      <div className="w-full">
        <ChatInput sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default ChatWrapper;
