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
    <div className="flex flex-col h-full justify-between p-4">
      <div>
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
                  /*          loading={loading && m.role !== "system"} */
                />
              )}
            </Fragment>
          ))}
        </ul>
      </div>

      <form className="flex items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter what you are looking for..."
          className="input input-bordered w-full max-w-xs mr-2 bg-violet-500 placeholder-gray-500::placeholder"
          value={input}
          onChange={handleInputChange}
        />
        <button className="hover:translate-x-2 transition-transform duration-300 text-gray-500 hover:text-violet-500">
          <RiArrowRightSLine size={28} />
        </button>
      </form>
    </div>
  );
}
