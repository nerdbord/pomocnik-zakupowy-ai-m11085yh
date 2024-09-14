"use client";
import React, { useEffect, useState } from "react";
import { RiRobot2Line } from "react-icons/ri";
import { PiFinnTheHuman } from "react-icons/pi";

type ChatMessageProps = {
  position: "start" | "end";
  message: string;
  loading?: boolean;
};

export const ChatMessage = ({
  position,
  message,
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
      <li className="flex my-4 items-end">
        <div className="avatar flex-shrink-0 w-12 h-12 rounded-full bg-black mr-2 my-1 flex items-center justify-center">
          <RiRobot2Line className="text-3xl text-fuchsia-600" />
        </div>

        <div className="flex flex-col flex-grow">
          <p className="text-xs text-gray-500 pl-4">
            Shop assistance {currentTime}
          </p>
          <div className="chat chat-start">
            <div className="chat-bubble min-w-16 max-w-full bg-violet-500">
              {loading ? <div className="loader"></div> : message}
            </div>
          </div>
        </div>
      </li>
    );
  }

  if (position === "end") {
    return (
      <li className="flex my-4 items-end justify-end">
        <div className="flex flex-col flex-grow items-end">
          <p className="text-xs text-gray-500 pr-4">You {currentTime}</p>
          <div className="chat chat-end">
            <div className="chat-bubble min-w-16 max-w-full bg-fuchsia-600">
              {message}
            </div>
          </div>
        </div>

        <div className="avatar flex-shrink-0 w-12 h-12 rounded-full bg-black ml-2 my-1 flex items-center justify-center">
          <PiFinnTheHuman className="text-3xl text-fuchsia-600" />
        </div>
      </li>
    );
  }
};
