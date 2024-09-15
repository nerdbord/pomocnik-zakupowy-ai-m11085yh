"use client";
import React from "react";
import Link from "next/link";
import { CloseXProd } from "@/assets/CloseXProd";

type ProductCardPropsSidebar = {
  imageSrc: string;
  title: string;
  description: string;
  price: string;
  productUrl: string;
  onDelete?: () => void;
};

export const ProductCardSidebar: React.FC<ProductCardPropsSidebar> = ({
  imageSrc,
  title,
  description,
  price,
  productUrl,
  onDelete,
}) => {
  return (
    <div className="relative text-slate-900">
      <Link href={productUrl}>
        <div className=" card card-side bg-violet-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 gap-0 rounded-md ">
          <figure>
            <img className="rounded-md pl-3" src={imageSrc} alt={title} />
          </figure>
          <div className="card-body p-3 text-slate-900 gap-0 text-sm not-italic font-normal leading-5">
            <h2 className="card-title truncate">{title}</h2>
            <p className="truncate overflow-hidden whitespace-nowrap">
              {description}
            </p>
            <p>{price}</p>
          </div>
        </div>
      </Link>
      <CloseXProd
        className="cursor-pointer absolute top-0 right-0 m-2 text-slate-900"
        onClick={onDelete}
      />
    </div>
  );
};
