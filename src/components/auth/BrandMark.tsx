import { cn } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type BrandMarkProps = {
  size?: number;
  className?: string;
};

const BrandMark: React.FC<BrandMarkProps> = ({ size = 88, className }) => {
  return (
    <Link
      href="/"
      className={cn("group flex w-fit flex-col items-center", className)}
    >
      <Image
        src="/assets/logo3.svg"
        alt="MaxUp"
        priority
        height={size}
        width={size}
      />
      <p className="text-lg font-bold group-hover:tracking-[.25rem] transition-all ease-in-out duration-200 tracking-[.2rem] -mt-2">
        Ma<span className="text-[28px]">x</span>up
      </p>
    </Link>
  );
};

export default BrandMark;
