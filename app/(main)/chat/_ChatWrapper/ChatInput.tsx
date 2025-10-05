"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { type useChat } from "@ai-sdk/react";
import { ArrowUpIcon } from "lucide-react";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

type SendMessage = ReturnType<typeof useChat>["sendMessage"];

const ChatInput = ({ sendMessage }: { sendMessage: SendMessage }) => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const MAX_HEIGHT = 300;

  useEffect(() => {
    const savedDraft = localStorage.getItem("chat-draft");
    if (savedDraft) setText(savedDraft);
  }, []);

  useEffect(() => {
    localStorage.setItem("chat-draft", text);
  }, [text]);

  useEffect(() => {
    if (textareaRef.current) {
      const element = textareaRef.current;
      element.style.height = "auto";
      const newHeight = Math.min(element.scrollHeight, MAX_HEIGHT);
      element.style.height = `${newHeight}px`;

      if (element.scrollHeight > MAX_HEIGHT) element.style.overflowY = "auto";
      else element.style.overflowY = "hidden";
    }
  }, [text]);

  const handleSendMessage = () => {
    const value = text.trim();
    if (!value || value === "") return;

    sendMessage({ text: value });
    setText("");
    localStorage.removeItem("chat-draft");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="shadow-none p-3 rounded-4xl shrink-0">
      <div className="flex justify-between">
        <textarea
          className="w-full shadow-none border-none focus:outline-none focus:border text-md px-3 resize-none transition-all duration-100"
          value={text}
          ref={textareaRef}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask scrib anything"
        />
        <div className="flex flex-col items-center justify-center">
          <Button
            disabled={text === ""}
            onClick={handleSendMessage}
            className="rounded-full"
          >
            <ArrowUpIcon className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatInput;
