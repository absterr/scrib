import { type UIMessage } from "@ai-sdk/react";
import { cn } from "@/lib/utils";

const Messages = ({ messages }: { messages: UIMessage[] }) => (
  <div className="flex flex-col gap-2 overflow-y-auto">
    {messages.map((message, index) => (
      <div
        className={cn("flex", {
          "justify-end": message.role === "user",
        })}
        key={index}
      >
        <div
          className={cn({
            "bg-neutral-900 opacity-60 rounded-xl max-w-lg my-3 text-white p-3":
              message.role === "user",
          })}
        >
          <div>
            {message.parts
              .filter((part) => part.type === "text")
              .map((part) => part.text)}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Messages;
