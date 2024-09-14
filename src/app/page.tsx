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
    <>
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
            <ChatMessage
              position="start"
              message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quae incidunt, veritatis reprehenderit repudiandae assumenda repellendus aspernatur ad dignissimos autem veniam esse quam, suscipit neque tempore excepturi. Labore debitis fugit iure laborum eius nostrum amet incidunt odio a itaque aspernatur doloremque ipsum molestiae optio veniam, quae saepe, quisquam reiciendis! Odit."
            />
            <ChatMessage
              position="end"
              message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quae incidunt, veritatis reprehenderit repudiandae assumenda repellendus aspernatur ad dignissimos autem veniam esse quam, suscipit neque tempore excepturi. Labore debitis fugit iure laborum eius nostrum amet incidunt odio a itaque aspernatur doloremque ipsum molestiae optio veniam, quae saepe, quisquam reiciendis! Odit."
            />
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
    </>
  );
}
