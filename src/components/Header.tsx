import React from "react";
import { GoPlus } from "react-icons/go";
import { Logo } from "./Logo";

type Props = {
  onAddClick: () => void;
};

export const Header = ({ onAddClick }: Props) => {
  return (
    <div className="relative flex justify-end pb-2">
      <div className="flex items-center gap-2 absolute top-1/4 left-1/3">
        <Logo />
        <h1 className="not-italic leading-normal">
          Shop<span className="font-semibold ">Botek</span>
        </h1>
      </div>

      <div
        className="tooltip tooltip-secondary tooltip-left"
        data-tip="Create a new chat"
      >
        <button
          onClick={onAddClick}
          className="h-12 w-12 flex items-center justify-center rounded-full bg-violet-500 text-white shadow-lg"
        >
          <GoPlus className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};
