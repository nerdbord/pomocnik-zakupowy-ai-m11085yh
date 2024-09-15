import React from "react";
import { CloseX } from "@/assets/CloseX";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  children,
}) => {
  return (
    <div
      className={`absolute top-0 right-0 w-3/4 h-full z-10 p-4 transition-transform duration-300 ease-in-out background ${
        isOpen ? "translate-x-0" : "translate-x-[100%]"
      }`}
    >
      <div className="flex justify-between gap-3 pt-14">
        <p className="text-xl not-italic font-semibold leading-7 text-white pb-5">
          List of your links
        </p>
        <CloseX className="cursor-pointer" onClick={toggleSidebar} />
      </div>
      <div className="flex flex-col justify-between gap-3">{children}</div>
    </div>
  );
};
