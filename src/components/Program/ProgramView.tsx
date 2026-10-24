"use client";
import {
  getProgram,
  resetProgramProgress,
  updateSetProgress,
} from "@/api/program";
import { cn } from "@/libs/utils";
import { formatReps, getProgramProgress, toDayKey } from "@/utils";
import { ArrowLeft, Check, Pencil, RotateCcw, Trophy } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import CustomLoader from "../Common/CustomLoader";
import { focusRing } from "../auth/FormControls";

type ProgramViewProps = {
  id: string;
};

type SetChange = {
  exerciseId: string;
  setIndex?: number;
  done: boolean;
};

// Apply a tick locally so the UI responds before the server does.
const applySetChange = (program: IProgram, change: SetChange): IProgram => ({
  ...program,
  exercises: program.exercises.map((exercise) => {
    if (exercise._id !== change.exerciseId) return exercise;
    if (change.setIndex === undefined) {
      return {
        ...exercise,
        completedSets: change.done
          ? Array.from({ length: exercise.sets }, (_, index) => index)
          : [],
      };
    }
    const rest = exercise.completedSets.filter((index) => index !== change.setIndex);
    return {
      ...exercise,
      completedSets: change.done ? [...rest, change.setIndex] : rest,
    };
  }),
});

const secondaryButtonClassName = cn(
  "group flex items-center gap-2 h-10 px-3 rounded-lg bg-zinc-900 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-50 disabled:pointer-events-none",
  focusRing
);
// The global `* { color: white }` rule reaches SVGs, so icons get explicit strokes.
const secondaryIconClassName = "stroke-zinc-300 group-hover:stroke-white transition-colors";

const ProgramView: React.FC<ProgramViewProps> = ({ id }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const today = toDayKey(new Date());
  const queryKey = ["program", id, today];

  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getProgram({ id, date: today }),
    queryKey,
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
  const program: IProgram | undefined = data?.program;
  const { totalSets, doneSets, percent, isComplete, exercisesDone } =
    getProgramProgress(program);

  // Ticks are applied optimistically. Once the last of a burst of taps
  // settles, refetch so the screen matches what the server saved.
  const latestRequest = useRef(0);
  const { mutate: markSets } = useMutation({
    mutationFn: updateSetProgress,
    onMutate: async (variables) => {
      const requestId = ++latestRequest.current;
      await queryClient.cancelQueries(queryKey);
      queryClient.setQueryData(queryKey, (old: any) =>
        old?.program ? { ...old, program: applySetChange(old.program, variables) } : old
      );
      return { requestId };
    },
    onError: (error: any) => {
      toast.error(error?.message ?? "Couldn't save that set. Try again.");
    },
    onSettled: (_data, _error, _variables, context) => {
      if (context?.requestId === latestRequest.current) {
        queryClient.invalidateQueries(["program", id]);
        queryClient.invalidateQueries("programs");
      }
    },
  });

  const { mutate: reset, isLoading: resetting } = useMutation({
    mutationFn: resetProgramProgress,
    onSuccess: (response) => {
      queryClient.setQueryData(queryKey, response);
      queryClient.invalidateQueries("programs");
      toast.success("Today's ticks cleared");
    },
    onError: (error: any) => {
      toast.error(error?.message ?? "Couldn't reset. Try again.");
    },
  });

  const toggleSet = (exerciseId: string, setIndex: number, done: boolean) =>
    markSets({ id, exerciseId, setIndex, done, date: today });
  const toggleExercise = (exerciseId: string, done: boolean) =>
    markSets({ id, exerciseId, done, date: today });

  if (isLoading) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4">
        <CustomLoader amount={1} height="h-[120px]" weight="w-full" />
        <CustomLoader amount={4} height="h-[120px]" weight="w-full" />
      </div>
    );
  }

  if (isError || !program) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-lg font-semibold">Program not found</p>
        <p className="mt-1 text-zinc-400">It may have been deleted.</p>
        <Link
          href="/programs"
          className="mt-4 inline-block font-semibold text-emerald-400 hover:text-emerald-300"
        >
          Back to programs
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto mb-24 flex w-full max-w-3xl flex-col gap-6 px-4">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => router.push("/programs")}
          aria-label="Back to programs"
          className={cn(
            "bg-zinc-900 rounded-lg h-[40px] w-[40px] flex items-center justify-center hover:bg-emerald-600 transition-colors",
            focusRing
          )}
        >
          <ArrowLeft />
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => reset({ id, date: today })}
            disabled={resetting || doneSets === 0}
            title="Clear today's ticks"
            className={secondaryButtonClassName}
          >
            <RotateCcw size={16} aria-hidden className={secondaryIconClassName} />
            Reset
          </button>
          <Link href={`/programs/${id}/edit`} className={secondaryButtonClassName}>
            <Pencil size={16} aria-hidden className={secondaryIconClassName} />
            Edit
          </Link>
        </div>
      </div>

      <header>
        <h1 className="text-3xl font-bold uppercase tracking-tight break-words">
          {program.name}
        </h1>
        <p className="mt-1 text-zinc-400">
          {program.exercises.length}{" "}
          {program.exercises.length === 1 ? "exercise" : "exercises"} ·{" "}
          {totalSets} sets
        </p>
      </header>

      <section
        aria-label="Today's progress"
        className={cn(
          "rounded-xl border p-4",
          isComplete
            ? "border-emerald-500/40 bg-emerald-500/10"
            : "border-zinc-800 bg-zinc-900/60"
        )}
      >
        <div className="flex items-center justify-between gap-3">
          {isComplete ? (
            <p className="flex items-center gap-2 font-semibold text-emerald-300">
              <Trophy size={18} aria-hidden className="stroke-emerald-300" />
              Session complete. Nice work!
            </p>
          ) : (
            <p className="font-semibold">
              Today{" "}
              <span className="text-sm font-normal text-zinc-400">
                · {exercisesDone}/{program.exercises.length} exercises done
              </span>
            </p>
          )}
          <p className="text-sm tabular-nums text-zinc-300" aria-live="polite">
            {doneSets}/{totalSets} sets
          </p>
        </div>
        <div
          role="progressbar"
          aria-label="Sets done today"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-800"
        >
          <div
            className="h-full rounded-full bg-emerald-400 transition-[width] duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </section>

      <ol className="flex flex-col gap-3">
        {program.exercises.map((exercise, index) => {
          const done = exercise.completedSets.length >= exercise.sets;
          return (
            <li
              key={exercise._id}
              className={cn(
                "rounded-xl border p-4 transition-colors",
                done
                  ? "border-emerald-500/40 bg-emerald-500/5"
                  : "border-zinc-800 bg-zinc-900/60"
              )}
            >
              <div className="flex items-start gap-3">
                <p className="w-7 shrink-0 pt-0.5 text-lg font-semibold italic text-zinc-500">
                  #{index + 1}
                </p>
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "break-words text-lg font-semibold capitalize",
                      done && "text-zinc-400 line-through decoration-emerald-500/60"
                    )}
                  >
                    {exercise.name}
                  </p>
                  <p className="text-sm font-semibold text-emerald-400 tabular-nums">
                    {exercise.sets} {exercise.sets === 1 ? "set" : "sets"} ×{" "}
                    {formatReps(exercise.reps)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleExercise(exercise._id, !done)}
                  aria-pressed={done}
                  aria-label={
                    done
                      ? `Mark ${exercise.name} as not done`
                      : `Mark all sets of ${exercise.name} done`
                  }
                  title={done ? "Undo" : "Mark all sets done"}
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors",
                    done
                      ? "border-emerald-500 bg-emerald-500 hover:bg-emerald-400"
                      : "border-zinc-700 hover:border-emerald-500",
                    focusRing
                  )}
                >
                  <Check
                    size={18}
                    strokeWidth={3}
                    aria-hidden
                    className={done ? "stroke-zinc-950" : "stroke-zinc-600"}
                  />
                </button>
              </div>

              <div
                role="group"
                aria-label={`Sets for ${exercise.name}`}
                className="mt-3 flex flex-wrap gap-2 sm:pl-10"
              >
                {Array.from({ length: exercise.sets }, (_, setIndex) => {
                  const setDone = exercise.completedSets.includes(setIndex);
                  return (
                    <button
                      key={setIndex}
                      type="button"
                      onClick={() => toggleSet(exercise._id, setIndex, !setDone)}
                      aria-pressed={setDone}
                      aria-label={`Set ${setIndex + 1} of ${exercise.name}`}
                      className={cn(
                        "flex h-10 min-w-[72px] items-center justify-center gap-1.5 rounded-lg border px-3 text-sm font-semibold transition-colors",
                        setDone
                          ? "border-emerald-500 bg-emerald-500 text-zinc-950 hover:bg-emerald-400"
                          : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500 hover:text-white",
                        focusRing
                      )}
                    >
                      {setDone && (
                        <Check size={14} strokeWidth={3} aria-hidden className="stroke-zinc-950" />
                      )}
                      Set {setIndex + 1}
                    </button>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default ProgramView;
