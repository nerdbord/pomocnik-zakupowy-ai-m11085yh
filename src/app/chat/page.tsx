"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { ChatMessage } from "@/components/ChatMessage";
import { useChat } from "ai/react";
import { RiArrowRightSLine } from "react-icons/ri";
import { Pill } from "@/components/Pill";

export default function Home() {
  const { messages, handleInputChange, handleSubmit, input, isLoading, stop } =
    useChat({
      initialMessages: [
        { role: "system", content: "How can I help you?", id: "1" },
      ],
    });
  const chatParent = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  const loading = isLoading && !hasStartedTyping;

  const handleAddClick = () => {
    console.log("header button clicked");
  };

  useEffect(() => {
    const domNode = chatParent.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  });

  useEffect(() => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [input]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  useEffect(() => {
    if (isLoading) {
      setHasStartedTyping(false);
    }

    const lastMessage = messages[messages.length - 1];

    if (lastMessage && lastMessage.role === "assistant") {
      setHasStartedTyping(true);
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full justify-between p-4">
      <div className="flex-shrink-0">
        <Header onAddClick={handleAddClick} />
      </div>

      <ul
        ref={chatParent}
        className="flex-grow overflow-y-auto mb-4 no-scrollbar p-2"
      >
        {messages.map(m => {
          const toolInvocation = m.toolInvocations?.[0];

          if (toolInvocation && toolInvocation.state === "result") {
            stop();

            const result = toolInvocation.result as {
              url: string;
              title: string;
              image: string | null;
            }[];

            return (
              <ul className="flex gap-3">
                {result.map(r => (
                  <li key={r.url} className="flex items-center gap-2">
                    <a href={r.url} target="_blank" rel="noreferrer">
                      <img
                        src={r.image || "/placeholder.png"}
                        alt={r.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <h3 className="text-sm font-semibold">{r.title}</h3>
                    </a>
                  </li>
                ))}
              </ul>
            );
          } else {
            return (
              <Fragment key={m.id}>
                {m.content.length <= 1 ? null : m.role === "user" ? (
                  <ChatMessage position="end" message={m.content} />
                ) : (
                  <ChatMessage position="start" message={m.content} />
                )}
              </Fragment>
            );
          }
        })}

        {loading && (
          <ChatMessage position="start" message="" loading={loading} />
        )}
      </ul>

      {/* <div className="flex gap-4 my-4 flex-wrap flex-shrink-0">
        <Pill text="Sports" />
        <Pill text="Running" />
        <Pill text="Blue" />
        <Pill text="Sports" />
        <Pill text="Running" />
        <Pill text="Blue" />
        <Pill text="Sports" />
        <Pill text="Running" />
        <Pill text="Blue" />
      </div> */}

      <form
        className="flex items-center flex-shrink-0 mb-4"
        onSubmit={handleSubmit}
      >
        <textarea
          ref={inputRef}
          rows={2}
          placeholder="Enter what you are looking for..."
          className="input input-bordered w-full max-w-xs mr-2 p-2 bg-violet-500 placeholder-violet-300 resize-none overflow-hidden"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{ height: "auto" }}
        />

        <button className="hover:translate-x-2 transition-transform duration-300 text-violet-300 hover:text-violet-500">
          <RiArrowRightSLine size={28} />
        </button>
      </form>
    </div>
  );
}
