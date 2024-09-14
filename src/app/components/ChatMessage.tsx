import React, { useEffect, useState } from "react";

type ChatMessageProps = {
  position: "start" | "end";
  message: string;
  avatarUrl: string;
  loading?: boolean;
};

export const ChatMessage = ({
  position,
  message,
  avatarUrl,
  loading = false,
}: ChatMessageProps) => {
  const [currentTime, setCurrentTime] = useState<string>("");

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    setCurrentTime(getCurrentTime());
  }, []);

  if (position === "start") {
    return (
      <div className="flex my-4 items-end">
        <div className="avatar flex items-center mr-2">
          <div className="w-10 my-1 rounded-full">
            <img src={avatarUrl} alt="Avatar" />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-gray-500 pl-4">
            Shop assistance {currentTime}
          </p>
          <div className="chat chat-start">
            <div className="chat-bubble min-w-16">
              {loading ? <div className="loader"></div> : message}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (position === "end") {
    return (
      <div className="flex my-2 items-end justify-end">
        <div className="flex flex-col items-end">
          <p className="text-xs text-gray-500 pr-4">You {currentTime}</p>
          <div className="chat chat-end">
            <div className="chat-bubble min-w-16">{message}</div>
          </div>
        </div>
        <div className="avatar flex items-center ml-2">
          <div className="w-10 my-1 rounded-full">
            <img src={avatarUrl} alt="Avatar" />
          </div>
        </div>
      </div>
    );
  }

  return null;
};
