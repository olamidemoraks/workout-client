"use client";
import { cn } from "@/libs/utils";
import { ChevronRightIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useCallback } from "react";
import { BiCaretRight, BiSolidZap } from "react-icons/bi";
import { useQuery } from "react-query";
import { getChallengeInfo } from "@/api/challenge";
import { useRouter } from "next/navigation";
import { TiStarFullOutline } from "react-icons/ti";
import { GiAchievement } from "react-icons/gi";

type ChallengeViewProps = {
  id: string;
};

const ChallengeView: React.FC<ChallengeViewProps> = ({ id }) => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      return await getChallengeInfo(id);
    },
  });

  const challenge: Challenge = data?.challenge;
  const progressInfo = {
    currentDay: data?.currentDay ?? 1,
    isCompleted: data?.isCompleted ?? false,
  };

  const calenderCreator = useCallback(() => {
    if (challenge?.days > 0) {
      const weeks = Math.floor(challenge?.days / 7);

      const calender = Array(weeks)
        .fill(0)
        .map((_, index) => {
          return {
            week: index + 1,
            index: Array(7)
              .fill(0)
              .map((_, day) => day + 7 * index + 1),
          };
        });

      if (challenge?.days % 7 > 0) {
        const remainder = challenge?.days % 7;
        const remainderDays = {
          week: weeks + 1,
          index: Array(remainder)
            .fill(0)
            .map((_, day) => day + 1 + 7 * weeks),
        };
        calender.push(remainderDays);
      }

      return calender;
    }
  }, [challenge]);

  const handleStartWorkout = (day: number) => {
    if (day !== progressInfo.currentDay) {
      return;
    }
    router.push(`/challenge/preview/${id}`);
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center">
        <Loader2 className=" text-3xl text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className=" flex flex-col items-center">
      <div className="lg:w-[720px] w-full relative">
        <div className="sm:h-[250px] h-[200px] w-full relative bg-gradient-to-br to-zinc-950 from-zinc-900 rounded-xl">
          <Image
            src={challenge?.image?.url}
            alt=""
            height={1333}
            width={2000}
            className="absolute object-cover h-full w-full rounded-lg"
          />
          <div className="flex flex-col justify-between h-full w-full bg-gradient-to-br from-zinc-950/60 to-zinc-950/20 absolute p-6">
            <div>
              <p className="font-bold uppercase text-3xl">{challenge?.title}</p>
              <p className=" font-semibold uppercase text-lg">
                {challenge?.days} days Challenge
              </p>
            </div>
            <div>
              <div className="flex justify-between w-full">
                {progressInfo.currentDay === challenge.days &&
                progressInfo.isCompleted ? (
                  <p>Completed </p>
                ) : (
                  <p>
                    {challenge?.days -
                      (progressInfo?.currentDay +
                        (progressInfo?.isCompleted ? 0 : -1))}{" "}
                    days left
                  </p>
                )}
                <p className=" text-zinc-400">
                  <span className=" text-white font-bold">
                    {progressInfo?.currentDay}
                  </span>
                  /{challenge?.days}
                </p>
              </div>
              <div className="w-full h-[5px] bg-slate-50/20 rounded backdrop-blur-sm mt-1 relative">
                <div className="absolute w-full">
                  <div
                    className=" h-[5px] bg-emerald-600 rounded absolute"
                    style={{
                      width: `${
                        (progressInfo?.currentDay +
                          (progressInfo?.isCompleted ? 0 : -1)) *
                        (100 / challenge?.days)
                      }%`,
                    }}
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
          {calenderCreator()?.map(({ week, index }) => (
            <div className="flex flex-row sm:gap-x-6 gap-x-3" key={week}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "min-h-[30px] w-[30px] rounded-full bg-zinc-700 flex items-center justify-center",
                    {
                      "bg-emerald-600": progressInfo.currentDay >= index[0],
                    }
                  )}
                >
                  <BiSolidZap />
                </div>
                <div
                  className={cn(" h-full w-[2px] bg-zinc-700", {
                    " hidden": week === calenderCreator()?.length,
                    "bg-emerald-600": progressInfo.currentDay >= index[0],
                  })}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <p
                  className={cn(" text-base text-zinc-500 font-semibold", {
                    "text-emerald-500": progressInfo.currentDay >= index[0],
                  })}
                >
                  Week {week}
                </p>
                <ul className=" bg-zinc-900/50 backdrop-blur-sm rounded w-full grid grid-cols-4 gap-y-7 md:pl-7 pl-3 py-6 items-center h-full mb-2 ">
                  {index.map((day, idx) => (
                    <li key={day} className="flex items-center justify-around">
                      <button
                        onClick={() => handleStartWorkout(day)}
                        className="relative z-10 flex flex-col items-center justify-center"
                      >
                        <div
                          className={cn(
                            "flex absolute -z-[1] items-center justify-center sm:h-8 sm:w-8 h-7 w-7 rounded-md  border-[3px] rotate-45 border-zinc-700 group cursor-no-drop transition duration-200",
                            {
                              " scale-105 bg-emerald-600 border-emerald-600 text-emerald-500 font-semibold ring-4 ring-emerald-500/10 cursor-pointer hover:scale-110":
                                progressInfo.currentDay === day,
                              " border-emerald-900/70 bg-emerald-900/70 font-semibold cursor-no-drop":
                                progressInfo.currentDay === day &&
                                progressInfo.isCompleted,
                              "   border-emerald-900/70 bg-emerald-900/70 font-semibold cursor-no-drop":
                                progressInfo.currentDay > day,
                            }
                          )}
                        ></div>
                        <p
                          className={cn(" text-neutral-200", {
                            "font-bold text-white":
                              progressInfo.currentDay === day &&
                              !progressInfo.isCompleted,
                          })}
                        >
                          {idx + 1}
                        </p>

                        {(progressInfo.currentDay > day ||
                          (progressInfo.currentDay === day &&
                            progressInfo.isCompleted)) && (
                          <div className="flex items-center gap-1 absolute  -bottom-5 md:scale-75 scale-50 opacity-60 cursor-none ">
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
                      <BiCaretRight
                        className={cn(" fill-zinc-700", {
                          " opacity-0": idx + 1 === 4,
                        })}
                      />
                    </li>
                  ))}
                  <li className=" flex items-center justify-around text-[24px] ">
                    <div className="sm:h-[50px] sm:w-[50px] h-[40px] w-[40px] relative   ">
                      <Image
                        src={"/assets/trophy.png"}
                        alt="trophy"
                        width={800}
                        height={961}
                        className={cn(
                          "w-full h-full object-cover grayscale opacity-50 md:-ml-3 -ml-1",
                          {
                            "grayscale-0 opacity-100":
                              progressInfo.currentDay >= index[6] ||
                              (progressInfo.currentDay === challenge.days &&
                                progressInfo.isCompleted),
                          }
                        )}
                      />
                    </div>

                    <div></div>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ChallengeView;
