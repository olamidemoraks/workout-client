import useStreakSummary from "@/hooks/useStreakSummary";
import { cn } from "@/libs/utils";
import { CalendarCheck, Flame, Trophy } from "lucide-react";
import React, { ReactNode } from "react";
import CustomLoader from "../Common/CustomLoader";
import StreakDays from "../Common/StreakDays";

type DailyAttendanceProps = {
  // Drop the card frame when rendered inside another surface (the navbar menu).
  embedded?: boolean;
  children?: ReactNode;
};

const DailyAttendance: React.FC<DailyAttendanceProps> = ({
  embedded,
  children,
}) => {
  const { streak, longestStreak, totalWorkout, status, message, week, isLoading } =
    useStreakSummary();

  if (isLoading) {
    return <CustomLoader amount={1} height="h-[260px]" weight="w-full" />;
  }

  const isLit = status === "done";

  return (
    <section
      aria-label="Workout streak"
      className={cn(
        "relative overflow-hidden",
        embedded ? "p-4" : "rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5"
      )}
    >
      {isLit && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl"
        />
      )}

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-400">Current streak</p>
          <p className="mt-1 flex items-baseline gap-2">
            <span className="text-4xl font-bold tracking-tight">{streak}</span>
            <span className="text-zinc-400">{streak === 1 ? "day" : "days"}</span>
          </p>
        </div>
        <div
          className={cn(
            "grid h-12 w-12 place-items-center rounded-2xl border",
            isLit
              ? "border-orange-400/30 bg-gradient-to-b from-amber-400 to-orange-500"
              : "border-zinc-800 bg-zinc-900"
          )}
        >
          <Flame
            size={24}
            aria-hidden
            className={cn(
              isLit ? "fill-white stroke-white" : "stroke-zinc-500"
            )}
          />
        </div>
      </div>

      <p
        className={cn("relative mt-2 text-sm text-zinc-400", {
          "text-orange-200": status === "pending" && streak > 0,
        })}
      >
        {message}
      </p>

      <div className="relative mt-5">
        <StreakDays week={week} />
      </div>

      <dl className="relative mt-5 grid grid-cols-2 gap-3 border-t border-zinc-800 pt-4">
        <div className="flex items-center gap-3">
          <Trophy size={18} aria-hidden className="stroke-amber-400" />
          <div>
            <dt className="text-xs text-zinc-500">Best streak</dt>
            <dd className="text-sm font-semibold">
              {longestStreak} {longestStreak === 1 ? "day" : "days"}
            </dd>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <CalendarCheck size={18} aria-hidden className="stroke-emerald-400" />
          <div>
            <dt className="text-xs text-zinc-500">Workout days</dt>
            <dd className="text-sm font-semibold">{totalWorkout}</dd>
          </div>
        </div>
      </dl>

      {children}
    </section>
  );
};

export default DailyAttendance;
