import Link from "next/link";
import React, { ReactNode } from "react";

type HomeSectionProps = {
  children: ReactNode;
  seeMoreLink: string;
  title: string;
};

const HomeSection: React.FC<HomeSectionProps> = ({
  children,
  seeMoreLink,
  title,
}) => {
  return (
    <div className="flex flex-col w-full gap-4">
      <>
        <div className="flex items-center justify-between w-full">
          <p className=" font-semibold uppercase sm:text-lg text-base text-zinc-300">
            {title}
          </p>
          <Link
            href={seeMoreLink}
            className="hover:underline-offset-2 bg-zinc-900 rounded-full p-2 px-3 text-zinc-300 hover:underline font-semibold text-xs "
          >
            see all
          </Link>
        </div>

        {children}
      </>
    </div>
  );
};
export default HomeSection;
