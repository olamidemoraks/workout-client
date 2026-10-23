import { cn } from "@/libs/utils";
import { Info, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";

type RestingProps = {
  padTo2Digits: (value: number) => string;
  restTime: number;
  setRestTime: React.Dispatch<React.SetStateAction<number>>;
  setIsResting: (value: boolean) => void;
  playWhisleSound: () => void;
  currentIndex: number;
  exerciseLength: number;
  currentExercise: IExercise | undefined;
  onShowInfo?: () => void;
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900";

// The ring sits on the 120px timer circle (viewBox 120, r = 56).
const RING_LENGTH = 2 * Math.PI * 56;

const Resting: React.FC<RestingProps> = ({
  padTo2Digits,
  restTime,
  setRestTime,
  playWhisleSound,
  setIsResting,
  currentIndex,
  exerciseLength,
  currentExercise,
  onShowInfo,
}) => {
  const seconds = Math.max(restTime, 0);
  const isGettingReady = seconds <= 5;

  // Rest starts at the exercise's rest time and grows with each +20s, so the
  // ring always shows the share of the current rest that's left.
  const [totalRest, setTotalRest] = useState(Math.max(restTime, 1));
  useEffect(() => {
    setTotalRest((prev) => Math.max(prev, restTime));
  }, [restTime]);
  const remaining = Math.min(seconds / totalRest, 1);

  const handleSkip = () => {
    playWhisleSound();
    setIsResting(false);
  };
  return (
    <div className="flex lg:flex-row flex-col w-full items-stretch justify-center lg:gap-8 gap-5 md:p-8 p-3">
      <div className=" flex flex-col items-center justify-evenly bg-zinc-900 rounded-lg w-full lg:w-[45%] py-8 gap-5">
        <div className="flex flex-col items-center gap-1">
          <p className=" text-2xl uppercase font-bold flex items-center gap-2">
            Rest
          </p>
          <p
            aria-live="polite"
            className={cn("text-sm text-zinc-400 transition-colors", {
              "text-orange-400 font-semibold": isGettingReady,
            })}
          >
            {isGettingReady ? "Get ready!" : "Breathe. Next one is coming up."}
          </p>
        </div>

        <div
          role="timer"
          aria-label={`${seconds} seconds of rest left`}
          className="h-[120px] w-[120px] relative flex items-center justify-center "
        >
          <div className=" h-full absolute w-full z-10 rounded-full flex items-center justify-center border border-zinc-800 bg-zinc-900">
            <p className=" md:text-4xl text-3xl font-bold tabular-nums">
              {padTo2Digits(Math.floor(seconds / 60))}:
              {padTo2Digits(seconds % 60)}
            </p>
          </div>
          <svg
            aria-hidden
            viewBox="0 0 120 120"
            className="absolute inset-0 z-20 h-full w-full -rotate-90 pointer-events-none"
          >
            <circle
              cx="60"
              cy="60"
              r="56"
              fill="none"
              strokeWidth="4"
              className="stroke-zinc-800"
            />
            <circle
              cx="60"
              cy="60"
              r="56"
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
              style={{
                strokeDasharray: RING_LENGTH,
                strokeDashoffset: RING_LENGTH * (1 - remaining),
                transition: "stroke-dashoffset 1s linear, stroke 0.3s",
              }}
              className={isGettingReady ? "stroke-orange-500" : "stroke-blue-500"}
            />
          </svg>
          <div
            className={cn(
              "h-[75px] w-[75px] bg-gradient-to-r  from-indigo-600 to-blue-600 rounded-full animate-ping ",
              { "from-orange-600 to-red-600": isGettingReady }
            )}
          />
        </div>

        <div className="flex items-center justify-center sm:gap-10 gap-4 w-full">
          <button
            onClick={() => setRestTime((prev) => Math.max(prev, 0) + 20)}
            aria-label="Add 20 seconds of rest"
            className={cn(
              "h-[50px] w-[100px] justify-center text-lg font-semibold bg-emerald-500 hover:bg-emerald-400 text-black rounded-md transition duration-200 flex items-center gap-1",
              focusRing
            )}
          >
            <Plus color="#000" />
            20s
          </button>
          <button
            onClick={handleSkip}
            className={cn(
              "h-[50px] w-[100px] justify-center text-lg font-semibold hover:bg-zinc-700 bg-zinc-800 text-emerald-500 rounded-md transition duration-200 flex items-center gap-2",
              focusRing
            )}
          >
            Skip
          </button>
        </div>
      </div>
      {/* <div className=" opacity-60">
          <Image
            src={"/assets/stability-ball.svg"}
            alt=""
            height={250}
            width={250}
            className=""
          />
        </div> */}

      <div className="w-full lg:w-[45%] rounded-lg bg-zinc-800 p-3 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <p className=" text-neutral-400 text-sm">
            Up Next {currentIndex + 1}/{exerciseLength}
          </p>
          {onShowInfo && currentExercise && (
            <button
              type="button"
              onClick={onShowInfo}
              className={cn(
                "group flex items-center gap-1 rounded-md px-2 py-1 text-sm text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors",
                focusRing
              )}
            >
              <Info size={16} aria-hidden className="stroke-zinc-400 group-hover:stroke-white" />
              How to do it
            </button>
          )}
        </div>
        <div className="relative w-full lg:flex-1 lg:min-h-[180px] h-[180px] overflow-hidden rounded-lg bg-zinc-700">
          {currentExercise?.image?.url && (
            <Image
              src={currentExercise.image.url}
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className=" object-cover absolute"
            />
          )}
        </div>
        <div className="min-w-0">
          <p className=" font-bold text-lg truncate">{currentExercise?.name}</p>
          <p className="text-sm text-emerald-400 font-semibold tabular-nums">
            {currentExercise?.time_base
              ? `${padTo2Digits(
                  Math.floor((currentExercise?.repetition ?? 0) / 60)
                )}:${padTo2Digits((currentExercise?.repetition ?? 0) % 60)}`
              : `x${currentExercise?.repetition}`}
            {currentExercise && currentExercise.sets > 1
              ? ` · ${currentExercise.sets} sets`
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Resting;
