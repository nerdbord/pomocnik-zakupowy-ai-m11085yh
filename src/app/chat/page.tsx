"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { ChatMessage } from "@/components/ChatMessage";
import { Message, useChat } from "ai/react";
import { RiArrowRightSLine } from "react-icons/ri";
import { Pill } from "@/components/Pill";
import { SendArrow } from "@/assets/SendArrow";
import { LeftArrow } from "@/assets/LeftArrow";
import { ProductCard } from "@/components/ProductCard";

export default function Home() {
  const { messages, handleInputChange, handleSubmit, input, isLoading } =
    useChat();
  const chatParent = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  const messagesWithSystem: Message[] = [
    { role: "system", content: "How can I help you?", id: "1" },
    ...messages,
  ];

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

    const lastMessage = messagesWithSystem[messagesWithSystem.length - 1];

    if (lastMessage && lastMessage.role === "assistant") {
      setHasStartedTyping(true);
    }
  }, [messagesWithSystem, isLoading]);

  return (
    <div className="flex flex-col h-full justify-between p-4">
      <div className="flex-shrink-0">
        <Header onAddClick={handleAddClick} />
      </div>

      <ul
        ref={chatParent}
        className="flex-grow overflow-y-auto mb-4 no-scrollbar p-2"
      >
        {messagesWithSystem.map((m) => (
          <Fragment key={m.id}>
            {m.role === "user" ? (
              <ChatMessage position="end" message={m.content} />
            ) : (
              <ChatMessage position="start" message={m.content} />
            )}
          </Fragment>
        ))}

        {loading && (
          <ChatMessage position="start" message="" loading={loading} />
        )}
      </ul>

      <div className="products-bg p-4">
        <div className="cursor-pointer flex justify-between items-center pb-2 group">
          <p className="text-xs not-italic font-normal leading-4 text-violet-300">
            Click the title to go to product or list
          </p>
          <LeftArrow className="transition-transform duration-300 group-hover:translate-x-2" />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="flex flex-col justify-between gap-4">
            <p className="text-center">The most expensive</p>
            <ProductCard
              imageSrc="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              title="Nike"
              description="Sneakersy Airmax"
              price="500 $"
              productUrl="/product/nike-sneakers"
            />
          </div>

          <div className="flex flex-col justify-between gap-4">
            <p className="text-center">
              The
              <br /> cheapest
            </p>
            <ProductCard
              imageSrc="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              title="Nike"
              description="Sneakersy Airmax"
              price="500 $"
              productUrl="/product/nike-sneakers"
            />
          </div>

          <div className="flex flex-col justify-between gap-4">
            <p className="text-center">The most fitting</p>
            <ProductCard
              imageSrc="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              title="Nike"
              description="Sneakersy Airmax"
              price="500 $"
              productUrl="/product/nike-sneakers"
            />
          </div>
        </div>
      </div>

      {/*       <div className="flex gap-4 my-4 flex-wrap flex-shrink-0">
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
        className="flex items-center flex-shrink-0 my-4"
        onSubmit={handleSubmit}
      >
        <textarea
          ref={inputRef}
          rows={2}
          placeholder="What do you want to buy today?"
          className="input w-full max-w-xs mr-2 p-2 bg-violet-600 placeholder-violet-300 resize-none overflow-hidden text-xs not-italic font-normal leading-4"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{ height: "auto" }}
        />

        <button className="hover:translate-x-2 transition-transform duration-300 text-violet-300 hover:text-violet-500">
          <SendArrow />
        </button>
      </form>
    </div>
  );
}
