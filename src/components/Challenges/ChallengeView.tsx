"use client";
import { cn } from "@/libs/utils";
import { getChallengeProgress } from "@/utils";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { BiSolidZap } from "react-icons/bi";
import { useQuery } from "react-query";
import { getChallengeInfo } from "@/api/challenge";
import { useRouter } from "next/navigation";
import { TiStarFullOutline } from "react-icons/ti";
import { GiAchievement } from "react-icons/gi";

type ChallengeViewProps = {
  id: string;
};

const pillClassName =
  "py-1 px-1 pl-3 flex items-center gap-2 backdrop-blur-md bg-neutral-600/30 text-white rounded-full w-fit text-sm font-bold transition";

const ChallengeView: React.FC<ChallengeViewProps> = ({ id }) => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      return await getChallengeInfo(id);
    },
    queryKey: ["challengeDay", id],
    enabled: !!id,
    retry: true,
    retryDelay: 6,
  });

  const challenge: Challenge = data?.challenge;
  const { currentDay, daysDone, daysLeft, percent, isFinished, isDoneToday } =
    getChallengeProgress({
      progress: data?.currentDay ?? 1,
      days: challenge?.days ?? 0,
      isCompleted: data?.isCompleted ?? false,
    });
  const canStartToday = !isDoneToday && !isFinished;

  const calender = useMemo(() => {
    const days = challenge?.days ?? 0;
    return Array.from({ length: Math.ceil(days / 7) }, (_, week) => ({
      week: week + 1,
      index: Array.from(
        { length: Math.min(7, days - week * 7) },
        (_, day) => day + 1 + 7 * week
      ),
    }));
  }, [challenge?.days]);

  const handleStartWorkout = (day: number) => {
    if (day !== currentDay || !canStartToday) {
      return;
    }
    router.push(`/challenge/preview/${id}`);
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-[50vh]">
        <Loader2 className=" text-3xl text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className=" flex flex-col items-center sm:mt-0 mt-3">
      <div className="lg:w-[720px] w-full relative px-3 sm:px-0">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="mb-4 bg-zinc-900 rounded-lg h-[40px] w-[40px] flex items-center justify-center cursor-pointer hover:bg-zinc-800 transition"
        >
          <ArrowLeft />
        </button>

        <div className="sm:h-[290px] h-[250px] w-full relative overflow-hidden bg-gradient-to-br to-zinc-950 from-zinc-900 rounded-xl">
          <Image
            src={challenge?.image?.url}
            alt=""
            height={1333}
            width={2000}
            className="absolute object-cover h-full w-full rounded-lg"
          />
          <div className="flex flex-col justify-between h-full w-full bg-gradient-to-t from-zinc-950/80 via-zinc-950/30 to-zinc-950/40 absolute sm:p-6 p-4">
            <div>
              <p className="font-bold uppercase text-3xl drop-shadow-md">
                {challenge?.title}
              </p>
              <p className=" font-semibold uppercase text-lg drop-shadow-md">
                {challenge?.days} days Challenge
              </p>
            </div>
            <div>
              <div className="mb-4">
                {isFinished ? (
                  <div className={pillClassName}>
                    <p>Challenge completed</p>
                    <div className="p-2 rounded-full bg-emerald-500">
                      <Check color="#fff" size={18} />
                    </div>
                  </div>
                ) : isDoneToday ? (
                  <div className={pillClassName}>
                    <p>Day {currentDay} done · next day unlocks tomorrow</p>
                    <div className="p-2 rounded-full bg-emerald-500">
                      <Check color="#fff" size={18} />
                    </div>
                  </div>
                ) : (
                  <Link
                    href={`/challenge/preview/${id}`}
                    className={cn(pillClassName, "group hover:bg-neutral-500/40")}
                  >
                    <p>Start day {currentDay}</p>
                    <div className="p-2 rounded-full bg-white transition group-hover:translate-x-0.5">
                      <ArrowRight color="#000" size={16} />
                    </div>
                  </Link>
                )}
              </div>
              <div className="flex justify-between w-full mb-2">
                {isFinished ? (
                  <p>Completed </p>
                ) : (
                  <p>
                    {daysLeft} {daysLeft === 1 ? "day" : "days"} left
                  </p>
                )}
                <p className=" text-zinc-400">
                  <span className=" text-white font-bold">{daysDone}</span>/
                  {challenge?.days} done
                </p>
              </div>
              <div className="w-full h-[5px] bg-slate-50/20 rounded backdrop-blur-sm mt-1 relative">
                <div className="absolute w-full">
                  <div
                    className=" h-[5px] bg-emerald-600 rounded absolute transition-[width] duration-700"
                    style={{ width: `${percent}%` }}
                  >
                    <GiAchievement
                      className=" absolute -top-2 -right-4"
                      size={27}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-10 w-full px-1 mb-[7rem]">
          {calender.map(({ week, index }) => {
            const weekStarted = currentDay >= index[0];
            const weekComplete = daysDone >= index[index.length - 1];
            const weekDone = index.filter((day) => day <= daysDone).length;

            return (
              <div className="flex flex-row sm:gap-x-6 gap-x-3" key={week}>
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "min-h-[30px] w-[30px] rounded-full bg-zinc-700 flex items-center justify-center transition-colors",
                      {
                        "bg-emerald-600": weekStarted,
                      }
                    )}
                  >
                    <BiSolidZap />
                  </div>
                  <div
                    className={cn(" h-full w-[2px] bg-zinc-700", {
                      " hidden": week === calender.length,
                      "bg-emerald-600": weekComplete,
                    })}
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-baseline justify-between pr-1">
                    <p
                      className={cn(" text-base text-zinc-500 font-semibold", {
                        "text-emerald-500": weekStarted,
                      })}
                    >
                      Week {week}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {weekDone}/{index.length} done
                    </p>
                  </div>
                  <div className="bg-zinc-900 backdrop-blur-sm rounded w-full flex justify-center">
                    <ul className="w-full grid grid-cols-4 gap-y-9 md:pl-7 pt-6 pb-8 place-items-center h-full mb-2 ">
                      {index.map((day, idx) => {
                        const isDone = day <= daysDone;
                        const isToday = day === currentDay && canStartToday;

                        return (
                          <li
                            key={day}
                            className="flex items-center justify-around"
                          >
                            <button
                              type="button"
                              onClick={() => handleStartWorkout(day)}
                              disabled={!isToday}
                              aria-label={`Day ${day}${
                                isDone ? ", done" : isToday ? ", start workout" : ""
                              }`}
                              className="group relative z-10 flex flex-col items-center justify-center disabled:cursor-no-drop"
                            >
                              {isToday && (
                                <span className="absolute sm:h-9 sm:w-9 h-8 w-8 rounded-md bg-emerald-500/40 animate-ping -z-[2]" />
                              )}
                              <div
                                className={cn(
                                  "flex absolute -z-[1] items-center justify-center sm:h-9 sm:w-9 h-8 w-8 rounded-md border-[3px] border-zinc-700 transition duration-200",
                                  {
                                    "scale-105 bg-emerald-600 border-emerald-600 ring-4 ring-emerald-500/10 group-hover:scale-110":
                                      isToday,
                                    "border-emerald-900/70 bg-emerald-900/70":
                                      isDone,
                                  }
                                )}
                              ></div>
                              <p
                                className={cn(" text-neutral-200", {
                                  "font-bold text-white": isToday,
                                  "font-semibold": isDone,
                                  "text-zinc-500": !isToday && !isDone,
                                })}
                              >
                                {idx + 1}
                              </p>

                              {isToday && (
                                <span className="absolute -bottom-6 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                                  Today
                                </span>
                              )}

                              {isDone && (
                                <div className="flex items-center gap-1 absolute -bottom-5 md:scale-75 scale-50 opacity-60">
                                  <TiStarFullOutline
                                    className=" fill-[#B4BDFF]/70"
                                    size={17}
                                  />
                                  <TiStarFullOutline
                                    className=" fill-[#B4BDFF]"
                                    size={21}
                                  />
                                  <TiStarFullOutline
                                    className=" fill-[#B4BDFF]/70"
                                    size={17}
                                  />
                                </div>
                              )}
                            </button>
                          </li>
                        );
                      })}
                      <li className=" flex items-center justify-around text-[24px] ">
                        <div className="sm:h-[50px] sm:w-[50px] h-[40px] w-[40px] relative">
                          <Image
                            src={"/assets/trophy.png"}
                            alt={weekComplete ? `Week ${week} complete` : ""}
                            width={800}
                            height={961}
                            className={cn(
                              "w-full h-full object-cover grayscale opacity-50 transition duration-500",
                              {
                                "grayscale-0 opacity-100 drop-shadow-[0_0_12px_rgba(251,191,36,0.45)]":
                                  weekComplete,
                              }
                            )}
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ChallengeView;
