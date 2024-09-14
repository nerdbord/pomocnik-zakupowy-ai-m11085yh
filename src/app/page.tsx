"use client";
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ChatMessage } from "@/components/ChatMessage";
import { RiArrowRightSLine } from "react-icons/ri";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handleAddClick = () => {
    console.log("header button clicked");
  };

  return (
    <>
      <Header onAddClick={handleAddClick} />

      <div className="flex-grow overflow-y-auto mb-4 no-scrollbar">
        <ChatMessage
          position="start"
          message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem adipisci, autem ab veniam error tempora eligendi repellendus a commodi nesciunt non consequatur nemo labore enim cumque molestiae accusantium aliquam quaerat vitae, fugit soluta accusamus sapiente. Modi tempora commodi error accusantium ex temporibus ea neque! Fuga vero doloribus pariatur molestiae consectetur."
        />
        <ChatMessage
          position="end"
          message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem adipisci, autem ab veniam error tempora eligendi repellendus a commodi nesciunt non consequatur nemo labore enim cumque molestiae accusantium aliquam quaerat vitae, fugit soluta accusamus sapiente. Modi tempora commodi error accusantium ex temporibus ea neque! Fuga vero doloribus pariatur molestiae consectetur."
        />
        <ChatMessage
          position="start"
          message="You underestimate my power!"
          loading={loading}
        />
      </div>

      <div className="flex items-center">
        <input
          type="text"
          placeholder="Enter what you are looking for..."
          className="input input-bordered w-full max-w-xs mr-2"
        />
        <button className="btn btn-ghost">
          <RiArrowRightSLine size={28} />
        </button>
      </div>
    </>
  );
}
