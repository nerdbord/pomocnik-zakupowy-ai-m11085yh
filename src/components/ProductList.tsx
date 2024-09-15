import React from "react";

export const ProductList = () => {
  return (
    <div className="products-bg p-4">
      <div
        onClick={toggleSidebar}
        className="cursor-pointer flex justify-between items-center pb-2 group"
      >
        <p className="cursor-pointertext-xs not-italic font-normal leading-4 text-violet-300">
          Click the title to go to product or list
        </p>
        <LeftArrow className="transition-transform duration-300 group-hover:translate-x-2" />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="flex flex-col justify-between gap-4">
          <p className="text-center">The most expensive</p>
          <ProductCard
            imageSrc="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            title="Nike"
            description="Sneakersy Airmax"
            price="500 $"
            productUrl="/product/nike-sneakers"
          />
        </div>

        <div className="flex flex-col justify-between gap-4">
          <p className="text-center">
            The
            <br /> cheapest
          </p>
          <ProductCard
            imageSrc="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            title="Nike"
            description="Sneakersy Airmax"
            price="500 $"
            productUrl="/product/nike-sneakers"
          />
        </div>

        <div className="flex flex-col justify-between gap-4">
          <p className="text-center">The most fitting</p>
          <ProductCard
            imageSrc="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            title="Nike"
            description="Sneakersy Airmax"
            price="500 $"
            productUrl="/product/nike-sneakers"
          />
        </div>
      </div>
    </div>
  );
};
