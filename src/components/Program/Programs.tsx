"use client";
import { getPrograms } from "@/api/program";
import { cn } from "@/libs/utils";
import { formatReps, getProgramProgress, toDayKey } from "@/utils";
import { Check, ListChecks, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import CustomLoader from "../Common/CustomLoader";
import { focusRing } from "../auth/FormControls";

export const primaryLinkClassName = cn(
  "flex shrink-0 items-center justify-center gap-2 h-11 px-4 rounded-xl bg-emerald-500 font-semibold text-zinc-950 hover:bg-emerald-400 transition-colors",
  focusRing
);

const PREVIEW_COUNT = 3;

const ProgramCard = ({ program }: { program: IProgram }) => {
  const { totalSets, doneSets, percent, isComplete } =
    getProgramProgress(program);
  const extra = program.exercises.length - PREVIEW_COUNT;

  return (
    <Link
      href={`/programs/${program._id}`}
      className={cn(
        "group flex flex-col gap-4 rounded-xl border bg-zinc-900/60 p-5 transition-colors hover:border-zinc-700",
        isComplete ? "border-emerald-500/40" : "border-zinc-800",
        focusRing
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold capitalize">
            {program.name}
          </h2>
          <p className="text-sm text-zinc-400">
            {program.exercises.length}{" "}
            {program.exercises.length === 1 ? "exercise" : "exercises"} ·{" "}
            {totalSets} sets
          </p>
        </div>
        {isComplete ? (
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-semibold text-zinc-950">
            <Check size={12} strokeWidth={3} aria-hidden className="stroke-zinc-950" />
            Done today
          </span>
        ) : doneSets > 0 ? (
          <span className="shrink-0 rounded-full bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300">
            In progress
          </span>
        ) : null}
      </div>

      <ul className="flex flex-col gap-1.5 text-sm">
        {program.exercises.slice(0, PREVIEW_COUNT).map((exercise) => (
          <li key={exercise._id} className="flex items-center justify-between gap-3">
            <span className="truncate capitalize text-zinc-300">
              {exercise.name}
            </span>
            <span className="shrink-0 tabular-nums text-zinc-500">
              {exercise.sets} × {formatReps(exercise.reps)}
            </span>
          </li>
        ))}
        {extra > 0 && <li className="text-zinc-500">+{extra} more</li>}
      </ul>

      <div className="mt-auto flex items-center gap-3">
        <div
          role="progressbar"
          aria-label={`${program.name} progress today`}
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-800"
        >
          <div
            className="h-full rounded-full bg-emerald-400 transition-[width] duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-xs tabular-nums text-zinc-400">
          {doneSets}/{totalSets} sets today
        </span>
      </div>
    </Link>
  );
};

const Programs = () => {
  const today = toDayKey(new Date());
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getPrograms({ date: today }),
    queryKey: ["programs", today],
    refetchOnWindowFocus: false,
  });

  const programs: IProgram[] = data?.programs ?? [];

  return (
    <div className="mx-auto mb-16 w-full max-w-5xl md:px-10 px-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className=" text-2xl font-semibold uppercase">Programs</h1>
          <p className="mt-1 max-w-xl text-zinc-400">
            Your own gym plans. Tick off each set as you go. Ticks reset every
            day, so each session starts fresh.
          </p>
        </div>
        <Link href="/programs/create" className={primaryLinkClassName}>
          <Plus size={18} aria-hidden className="stroke-zinc-950" />
          New program
        </Link>
      </div>

      <div className="mt-8">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <CustomLoader amount={4} height="h-[190px]" weight="w-full" />
          </div>
        ) : isError ? (
          <p className="rounded-xl border border-zinc-800 p-8 text-center text-zinc-400">
            Couldn&apos;t load your programs. Check your connection and try again.
          </p>
        ) : programs.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-zinc-800 px-6 py-14 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-zinc-900">
              <ListChecks size={22} aria-hidden className="stroke-emerald-400" />
            </span>
            <p className="text-lg font-semibold">No programs yet</p>
            <p className="max-w-sm text-zinc-400">
              Build a program like &ldquo;Push day&rdquo; with your exercises,
              sets and reps, then tick them off at the gym.
            </p>
            <Link href="/programs/create" className={cn(primaryLinkClassName, "mt-2")}>
              <Plus size={18} aria-hidden className="stroke-zinc-950" />
              Create your first program
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {programs.map((program) => (
              <ProgramCard program={program} key={program._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Programs;
