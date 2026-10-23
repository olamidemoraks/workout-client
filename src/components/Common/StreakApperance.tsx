import { cn } from "@/libs/utils";
import { Flame } from "lucide-react";
import Image from "next/image";
import React from "react";

type StreakApperanceProps = {
  type: number;
  streak: number;
  // Whether today's workout is already logged; an unlit flame nudges the user.
  active?: boolean;
};

const SEGMENTS = 10;

const getTier = (streak: number) =>
  streak >= 8 ? "blazing" : streak >= 6 ? "hot" : "warm";

const tierStyles = {
  // Animated WebP versions of the original GIFs, sized for the 32px badge.
  warm: {
    gif: "/assets/streak3.webp",
    label: "text-sky-300",
    segment: "bg-gradient-to-t from-sky-500 to-cyan-300",
  },
  hot: {
    gif: "/assets/spark1.webp",
    label: "text-orange-300",
    segment: "bg-gradient-to-t from-orange-600 to-amber-400",
  },
  blazing: {
    gif: "/assets/spark2.webp",
    label: "text-red-300",
    segment: "bg-gradient-to-t from-red-600 to-orange-400",
  },
};

const StreakApperance: React.FC<StreakApperanceProps> = ({
  type,
  streak,
  active = true,
}) => {
  if (type === 1) {
    const tier = tierStyles[getTier(streak)];
    return (
      <div className="flex h-10 items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 pl-1 pr-3 transition hover:border-zinc-700">
        <div
          className={cn("relative h-8 w-8 shrink-0", {
            "opacity-50 grayscale": !active,
          })}
        >
          <Image
            src={tier.gif}
            alt=""
            height={64}
            width={64}
            unoptimized
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-left text-[10px] font-semibold uppercase leading-none tracking-wider text-zinc-400">
            Streak{" "}
            <span className={cn("text-xs font-bold", tier.label)}>{streak}</span>
          </p>
          <div className="flex h-2.5 gap-[3px]" aria-hidden>
            {Array.from({ length: SEGMENTS }, (_, index) => (
              <span
                key={index}
                className={cn(
                  "w-[5px] rounded-[1px] bg-zinc-800",
                  index < streak && tier.segment
                )}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Type 2, and the default for anyone who hasn't picked a style yet.
  return (
    <div className="flex h-10 items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-3 transition hover:border-zinc-700">
      <Flame
        size={20}
        aria-hidden
        className={cn(
          active && streak > 0
            ? "fill-orange-500 stroke-amber-400"
            : "stroke-zinc-500"
        )}
      />
      <span className="text-base font-semibold tabular-nums">{streak}</span>
    </div>
  );
};
export default StreakApperance;
