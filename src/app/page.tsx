"use client";
import React, { Fragment, useEffect, useRef, useState} from "react";
import { Header } from "./components/Header";
import { ChatMessage } from "./components/ChatMessage";
import { Message, useChat } from "ai/react";

export default function Home() {
  const { messages, handleInputChange, handleSubmit, input } = useChat();
  const chatParent = useRef<HTMLUListElement | null>(null);

  const [loading, setLoading] = useState(true);

  const handleAddClick = () => {
    console.log("header button clicked");
  };

  useEffect(() => {
    const domNode = chatParent.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  });

  const messagesWithSystem: Message[] = [
    { role: "system", content: "How can I help you?", id: "1" },
    ...messages,
  ];

  return (
    <div className="h-[852px] w-[393px] border p-4 flex flex-col">
      <Header onAddClick={handleAddClick} />

      <ul ref={chatParent} className="overflow-y-auto">
        {messagesWithSystem.map(m => (
          <Fragment key={m.id}>
            {m.role === "user" ? (
              <ChatMessage
                position="end"
                message={m.content}
                avatarUrl="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            ) : (
              <ChatMessage
                position="start"
                message={m.content}
                avatarUrl="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                loading={loading && m.role !== "system"}
              />
            )}
          </Fragment>
        ))}
      </ul>

      <section className="p-4 mt-auto">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-3xl mx-auto items-center"
        >
          <input
            className="flex-1 min-h-[40px] border border-black rounded-md p-2"
            placeholder="Type your question here..."
            type="text"
            value={input}
            onChange={handleInputChange}
          />
          <button className="ml-2" type="submit">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}
