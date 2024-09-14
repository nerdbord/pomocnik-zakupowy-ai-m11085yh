"use client";
import React from "react";
import { LandingPic } from "@/assets/LandingPic";
import Link from "next/link";
import { Logo } from "@/components/Logo";

type Props = {};

export const Landing = () => {
  return (
    <div className="flex flex-col items-center p-0">
      <div className="flex items-center gap-2 pt-12">
        <Logo />
        <h1 className="text-xl not-italic ">
          Shop<span className="font-semibold ">Botek</span>
        </h1>
      </div>

      <h1 className="text-center text-xl not-italic font-semibold leading-7 py-7 px-6">
        Ai Chat Shopping will help you find perfectly matched products
        effortlessly.
      </h1>
      <LandingPic />
      <p className="text-center text-sm not-italic font-normal leading-5 p-7">
        Check it out and see how much time you can save!
      </p>
      <Link
        href="/chat"
        className="py-4 px-16 bg-violet-600 rounded-full transition duration-300 ease-in-out transform hover:bg-violet-700"
      >
        <span className="text-sm not-italic font-normal leading-5">
          I’m going shopping!
        </span>
      </Link>
    </div>
  );
};
