"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { ChatMessage } from "@/components/ChatMessage";
import { useChat } from "ai/react";
import { SendArrow } from "@/assets/SendArrow";
import { ProductCard } from "@/components/ProductCard";
import { LeftArrow } from "@/assets/LeftArrow";
import { ProductCardSidebar } from "@/components/ProductCardSidebar";
import { Sidebar } from "@/components/Sidebar";
import { dummyProducts } from "@/data/dummyProducts";

export default function Home() {
  const [chatId, setChatId] = useState<number | null>(null);
  const { messages, handleInputChange, handleSubmit, input, isLoading, stop } =
    useChat({
      initialMessages: [
        { role: "system", content: "How can I help you?", id: "1" },
      ],
      id: chatId?.toString(),
    });
  const chatParent = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [products, setProducts] = useState(dummyProducts);

  const handleDeleteProduct = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
    console.log(`Product with id ${id} deleted`);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const loading = isLoading && !hasStartedTyping;

  const handleAddClick = () => {
    setChatId(chatId => (chatId ?? 0) + 1);
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

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim()) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return;
    }
    handleSubmit(event);
  };

  return (
    <div
      className={`flex flex-col h-full justify-between p-4 relative overflow-hidden transition-all duration-300 ${
        isSidebarOpen ? "bg-black/50" : "bg-transparent"
      }`}
    >
      {/* Toast for empty input */}
      {showToast && (
        <div className="toast bottom-20 left-0 absolute z-10 ">
          <div className="p-4 rounded-xl bg-violet-500">
            <span>
              The input cannot be empty! <br /> Please tell us what you'd like
              to buy.
              <br /> For example, try typing:
              <ul className="list-disc list-inside">
                <li>I need to buy running shoes.</li>
                <li>Looking for football sneakers.</li>
                <li>Searching for sports shoes for basketball.</li>
              </ul>
            </span>
          </div>
        </div>
      )}

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
        {products.map((product) => (
          <ProductCardSidebar
            key={product.id}
            imageSrc={product.imageSrc}
            title={product.title}
            description={product.description}
            price={product.price}
            productUrl={product.productUrl}
            onDelete={() => handleDeleteProduct(product.id)}
          />
        ))}
      </Sidebar>

      {/* Main Content */}
      <div className="flex-shrink-0">
        <Header onAddClick={handleAddClick} />
      </div>

      <ul
        ref={chatParent}
        className="flex-grow overflow-y-auto mb-4 no-scrollbar p-2"
      >
        {messages.map((m) => {
          const toolInvocation = m.toolInvocations?.[0];

          if (toolInvocation && toolInvocation.state === "result") {
            stop();

            const result = toolInvocation.result as {
              title: string;
              url: string;
              image: string;
            }[];

            return (
              <div className="products-bg p-4 shadow-lg">
                <div
                  onClick={toggleSidebar}
                  className="cursor-pointer flex justify-between items-center pb-2 group"
                >
                  <p className="cursor-pointer text-xs not-italic font-normal leading-4 text-violet-300">
                    Click the title to go to product or list
                  </p>
                  <LeftArrow className="transition-transform duration-300 group-hover:translate-x-2" />
                </div>

                <ul className="grid grid-cols-3 gap-4 mt-4">
                  {result.length === 0 && (
                    <li className="text-violet-300 text-xs not-italic font-normal leading-4">
                      No products found
                    </li>
                  )}
                  {result.map((r) => (
                    <li
                      key={r.url}
                      className="flex flex-col justify-between gap-4"
                    >
                      <ProductCard
                        title={""}
                        imageSrc={r.image}
                        price={""}
                        productUrl={r.url}
                        description={r.title}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            );
          }

          return m.content.length > 1 ? (
            <Fragment key={m.id}>
              <ChatMessage
                position={m.role === "user" ? "end" : "start"}
                message={m.content}
              />
            </Fragment>
          ) : null;
        })}

        {loading && (
          <ChatMessage position="start" message="" loading={loading} />
        )}
      </ul>

      <form
        className="flex items-center flex-shrink-0 mb-4"
        onSubmit={handleFormSubmit}
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
