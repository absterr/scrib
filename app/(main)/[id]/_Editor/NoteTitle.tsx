"use client";
import { useEffect, useRef, useState } from "react";
import * as Y from "yjs";

const NoteTitle = ({ doc }: { doc: Y.Doc }) => {
  const titleText = doc.getText("title");
  const [title, setTitle] = useState(titleText.toString());
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleChange = () => setTitle(titleText.toString());
    titleText.observe(handleChange);
    return () => titleText.unobserve(handleChange);
  }, [titleText]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [title]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    titleText.delete(0, titleText.length);
    titleText.insert(0, event.target.value);
  };

  return (
    <textarea
      placeholder="Untitlted"
      ref={textareaRef}
      value={title}
      onChange={handleInputChange}
      className="text-5xl font-bold text-neutral-800 outline-0 overflow-hidden w-full resize-none"
    />
  );
};

export default NoteTitle;
