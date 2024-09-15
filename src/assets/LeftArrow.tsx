import React from "react";

type Props = {
  className?: string;
};

export const LeftArrow = ({ className }: Props) => {
  return (
    <svg
      width="18"
      height="13"
      viewBox="0 0 18 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10.8333 13L9.31667 11.4292L13.1625 7.58333H0V5.41667H13.1625L9.31667 1.57083L10.8333 0L17.3333 6.5L10.8333 13Z"
        fill="#C4B5FD"
      />
    </svg>
  );
};
