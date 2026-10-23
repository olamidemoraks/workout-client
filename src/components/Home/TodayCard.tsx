import { frontalChallenges } from "@/api/challenge";
import { cn } from "@/libs/utils";
import { getChallengeProgress } from "@/utils";
import { ArrowRight, CalendarDays, CheckCircle2, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import CustomLoader from "../Common/CustomLoader";
import { focusRing } from "../auth/FormControls";

// The first started challenge that still has days left.
const pickActiveChallenge =(challenges?: Challenge[]) =>
  challenges?.find((challenge) => {
    const { started, isFinished } = getChallengeProgress(challenge);
    return started && !isFinished;
  });

const primaryLink = cn(
  "flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 font-semibold text-zinc-950 transition hover:bg-emerald-400",
  focusRing
);
const secondaryLink = cn(
  "group flex h-11 items-center justify-center gap-2 rounded-xl border border-white/15 bg-zinc-950/40 px-5 font-medium text-zinc-100 backdrop-blur-md transition hover:bg-zinc-800",
  focusRing
);

const TodayCard = () => {
  const { data, isLoading } = useQuery({
    queryFn: frontalChallenges,
    queryKey: "Home-challenge",
  });

  if (isLoading) {
    return <CustomLoader amount={1} height="h-[280px]" weight="w-full" />;
  }

  const challenge = pickActiveChallenge(data?.challenges);

  if (!challenge) {
    return (
      <section className="relative isolate overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-emerald-500/15 blur-[100px]"
        />
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          Today&apos;s plan
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          Pick a challenge to get started
        </h2>
        <p className="mt-2 max-w-md text-zinc-400">
          Challenges give you one guided workout a day and track every day you
          finish.
        </p>
        <Link href="/challenge" className={cn(primaryLink, "mt-6 w-fit")}>
          Browse challenges
          <ArrowRight size={18} aria-hidden className="stroke-zinc-950" />
        </Link>
      </section>
    );
  }

  const { currentDay, daysDone, daysLeft, percent, isDoneToday } =
    getChallengeProgress(challenge);

  return (
    <section className="relative isolate flex min-h-[280px] flex-col justify-end overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
      <Image
        src={challenge.image?.url}
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/10 sm:bg-gradient-to-r sm:from-zinc-950 sm:via-zinc-950/75 sm:to-zinc-950/10" />

      <p
        className={cn(
          "flex items-center gap-2 text-xs font-semibold uppercase tracking-wider",
          isDoneToday ? "text-emerald-300" : "text-emerald-400"
        )}
      >
        {isDoneToday ? (
          <CheckCircle2 size={14} aria-hidden className="stroke-emerald-300" />
        ) : (
          <CalendarDays size={14} aria-hidden className="stroke-emerald-400" />
        )}
        {isDoneToday ? "Done for today" : "Today's workout"}
      </p>
      <h2 className="mt-2 max-w-lg text-3xl font-bold uppercase tracking-tight sm:text-4xl">
        {challenge.title}
      </h2>
      <p className="mt-1 text-zinc-300">
        {isDoneToday
          ? `Day ${currentDay} complete. Day ${currentDay + 1} unlocks tomorrow.`
          : `Day ${currentDay} of ${challenge.days} · ${daysLeft} ${
              daysLeft === 1 ? "day" : "days"
            } to go`}
      </p>

      <div className="mt-5 flex max-w-md items-center gap-3">
        <div
          role="progressbar"
          aria-label="Challenge progress"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2 flex-1 overflow-hidden rounded-full bg-white/15"
        >
          <div
            className="h-full rounded-full bg-emerald-400 transition-[width] duration-700"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-sm tabular-nums text-zinc-300">
          {daysDone}/{challenge.days} days
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {!isDoneToday && (
          <Link href={`/challenge/preview/${challenge._id}`} className={primaryLink}>
            <Play size={16} aria-hidden className="fill-zinc-950 stroke-zinc-950" />
            Start day {currentDay}
          </Link>
        )}
        <Link href={`/challenge/${challenge._id}`} className={secondaryLink}>
          View plan
          <ArrowRight
            size={16}
            aria-hidden
            className="stroke-zinc-300 transition group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </section>
  );
};

export default TodayCard;
