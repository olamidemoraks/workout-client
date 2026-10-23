import { cn } from "@/libs/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";
import { focusRing } from "../auth/FormControls";

type HomeSectionProps = {
  children: ReactNode;
  seeMoreLink: string;
  title: string;
  description?: string;
  customStyle?: string;
};

const HomeSection: React.FC<HomeSectionProps> = ({
  children,
  seeMoreLink,
  title,
  description,
  customStyle,
}) => {
  return (
    <section className="flex w-full flex-col gap-4">
      <div className="flex w-full items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          {description && <p className="text-sm text-zinc-400">{description}</p>}
        </div>
        <Link
          href={seeMoreLink}
          className={cn(
            "group flex shrink-0 items-center gap-0.5 rounded-lg px-2 py-1 text-sm font-medium text-zinc-400 transition hover:text-white",
            focusRing
          )}
        >
          See all
          <ChevronRight
            size={16}
            aria-hidden
            className="stroke-zinc-400 transition group-hover:translate-x-0.5 group-hover:stroke-white"
          />
        </Link>
      </div>

      <div className={customStyle}>{children}</div>
    </section>
  );
};
export default HomeSection;
