"use client";
import React, { useState } from "react";
import { Header } from "./components/Header";
import { ChatMessage } from "./components/ChatMessage";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handleAddClick = () => {
    console.log("header button clicked");
  };

  return (
    <div className="h-[852px] w-[393px] border p-4">
      <div>
        <Header onAddClick={handleAddClick} />
        <div>
          <ChatMessage
            position="start"
            message="It's over Anakin, I have the high ground."
            avatarUrl="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
          <ChatMessage
            position="end"
            message="You underestimate my power!"
            avatarUrl="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
          <ChatMessage
            position="start"
            message="You underestimate my power!"
            avatarUrl="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            loading={loading}
          />
        </div>
      </div>

      <div>
        <input type="text" />
      </div>
    </div>
  );
}
