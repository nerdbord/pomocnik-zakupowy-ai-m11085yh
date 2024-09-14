"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { ChatMessage } from "@/components/ChatMessage";
import { Message, useChat } from "ai/react";
import { RiArrowRightSLine } from "react-icons/ri";

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
    <div className="h-[852px] w-[393px] border p-4 flex flex-col justify-between">
      <Header onAddClick={handleAddClick} />

      <ul
        ref={chatParent}
        className="flex-grow overflow-y-auto mb-4 no-scrollbar"
      >
        {messagesWithSystem.map((m) => (
          <Fragment key={m.id}>
            {m.role === "user" ? (
              <ChatMessage position="end" message={m.content} />
            ) : (
              <ChatMessage
                position="start"
                message={m.content}
                loading={loading && m.role !== "system"}
              />
            )}
          </Fragment>
        ))}
      </ul>

      <form className="flex items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter what you are looking for..."
          className="input input-bordered w-full max-w-xs mr-2"
          value={input}
          onChange={handleInputChange}
        />
        <button className="btn btn-ghost">
          <RiArrowRightSLine size={28} />
        </button>
      </form>
    </div>
  );
}
