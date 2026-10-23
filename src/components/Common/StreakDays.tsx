import { cn } from "@/libs/utils";
import { WeekDay } from "@/utils";
import { Flame } from "lucide-react";
import React from "react";

type StreakDaysProps = {
  week: (WeekDay & { isActive: boolean })[];
};

const StreakDays: React.FC<StreakDaysProps> = ({ week }) => {
  return (
    <ol className="grid grid-cols-7 gap-1">
      {week.map(({ key, label, date, isToday, isFuture, isActive }) => (
        <li key={key} className="flex flex-col items-center gap-2">
          <span
            aria-hidden
            className={cn("text-[11px] font-medium text-zinc-500", {
              "text-zinc-100": isToday,
            })}
          >
            {label}
          </span>
          <span
            title={date.toLocaleDateString(undefined, {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-full border text-xs font-medium",
              isActive
                ? "border-orange-300/40 bg-gradient-to-b from-amber-400 to-orange-500 shadow-[0_0_16px_-4px] shadow-orange-500/70"
                : isToday
                ? "border-dashed border-orange-400/70 bg-orange-500/10 text-orange-300"
                : isFuture
                ? "border-zinc-800/60 text-zinc-700"
                : "border-zinc-800 bg-zinc-900 text-zinc-500"
            )}
          >
            {isActive ? (
              <Flame size={16} aria-hidden className="fill-white stroke-white" />
            ) : (
              date.getDate()
            )}
            <span className="sr-only">
              {date.toLocaleDateString(undefined, { weekday: "long" })}:{" "}
              {isActive ? "workout logged" : isFuture ? "upcoming" : "no workout"}
            </span>
          </span>
        </li>
      ))}
    </ol>
  );
};
export default StreakDays;
