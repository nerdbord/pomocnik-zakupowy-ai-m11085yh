import React from "react";

type Props = {
  text: string;
};

export const Pill = ({ text }: Props) => {
  return (
    <div className="bg-violet-600 text-white px-4 py-1 rounded-full text-xs not-italic font-normal leading-4">
      {text}
    </div>
  );
};
