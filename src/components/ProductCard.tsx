"use client";
import React from "react";
import Link from "next/link"; // Importuj komponent Link z Next.js

type ProductCardProps = {
  imageSrc: string;
  title: string;
  description: string;
  price: string;
  productUrl: string;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  title,
  description,
  price,
  productUrl,
}) => {
  return (
    <Link href={productUrl}>
      <div className="flex flex-col justify-between">
        <div className="card bg-violet-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 gap-0">
          <figure>
            <img className="rounded-md" src={imageSrc} alt={title} />
          </figure>
          <div className="card-body p-3 text-slate-900 gap-0 text-sm not-italic font-normal leading-5">
            <h2 className="card-title truncate">{title}</h2>
            <p className="truncate overflow-hidden whitespace-nowrap">
              {description}
            </p>
            <p>{price}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
