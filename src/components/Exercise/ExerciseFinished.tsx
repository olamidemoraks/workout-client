"use client";
import { createActivity } from "@/api/activity";
import { completedChallenge } from "@/api/challenge";
import useProfile from "@/hooks/useProfile";
import { cn } from "@/libs/utils";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useMutation } from "react-query";

type ExerciseFinishedProps = {
  endTime: Date;
  startTime: Date;
  exerciseLength: number;
  workoutName: string;
  workoutId: string;
  isChallenge?: boolean;
};

const ExerciseFinished: React.FC<ExerciseFinishedProps> = ({
  endTime,
  exerciseLength,
  startTime,
  workoutName,
  workoutId,
  isChallenge,
}) => {
  const router = useRouter();
  const [mood, setMood] = useState(2);
  const { profile } = useProfile();

  const { mutate, isLoading } = useMutation({
    mutationFn: createActivity,
    onSuccess: () => {
      router.push("/");
    },
  });
  const { mutate: challegeMutate, isLoading: isLoadingChallenge } = useMutation(
    {
      mutationFn: completedChallenge,
      onSuccess: () => {
        router.push("/");
      },
    }
  );

  const handleEndWorkout = (totalTime: number) => {
    if (!isChallenge) {
      mutate({ workoutId, totalTime });
    } else {
      challegeMutate({ challengeId: workoutId, workoutName, totalTime });
    }
  };

  const hours =
    new Date(endTime.getTime() - startTime.getTime()).getUTCHours() * 60;
  const minutes =
    new Date(endTime.getTime() - startTime.getTime()).getUTCMinutes() * 60;

  const seconds = new Date(
    endTime.getTime() - startTime.getTime()
  ).getUTCSeconds();

  const totalTime = hours + minutes + seconds;
  return (
    <div className=" w-full flex flex-col  items-center justify-center">
      <div className="xl:w-[60%] w-full ">
        <div className="relative w-full z-10">
          <Image
            src={"/assets/gears.jpg"}
            alt="completed"
            height={500}
            width={600}
            className=" object-cover w-full sm:h-[250px] h-[200px] rounded-lg brightness-50"
          />
          <div className="absolute sm:w-[50%] w-[70%] top-0  px-5 py-5">
            <p className=" md:text-4xl text-2xl font-semibold">
              Nice you&apos;ve completed your exercise!
            </p>
            <p className=" md:text-lg text-base mt-3">{workoutName}</p>
          </div>
        </div>
        <div className=" relative w-full  flex justify-center -mt-[30px] z-20">
          <div className=" bg-zinc-900 p-3 w-[70%] rounded-md flex items-center justify-evenly">
            <div className=" text-center">
              <small>Exercise</small>
              <p className="sm:text-3xl text-xl font-semibold ">
                {exerciseLength}
              </p>
            </div>
            <div className=" h-[70%] w-[1px] bg-zinc-800" />
            <div className=" text-center">
              <small>Time</small>
              <p className="sm:text-3xl text-xl font-semibold ">
                {new Date(endTime.getTime() - startTime.getTime()).getUTCHours()
                  ? new Date(
                      endTime.getTime() - startTime.getTime()
                    ).getUTCHours() + ":"
                  : "" +
                    new Date(
                      endTime.getTime() - startTime.getTime()
                    ).getUTCMinutes() +
                    ":" +
                    new Date(endTime.getTime() - startTime.getTime())
                      .getUTCSeconds()
                      .toString()
                      .padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-zinc-900 mt-5 rounded-lg p-3 px-5 gap-3 text-center mx-3">
          <p className="text-lg">How do you feel?</p>
          <p className=" text-sm tracking-wide text-neutral-300">
            your feedback will help us provide more suitable workout for you
          </p>
          <div className="flex justify-evenly items-center w-full mt-2">
            <div
              className={cn(
                "flex flex-col text-center cursor-pointer hover:bg-zinc-800 mx-2 py-2 rounded-md w-full",
                { "bg-zinc-800": mood === 1 }
              )}
              onClick={() => setMood(1)}
            >
              <span className="text-3xl">🥴</span> <p>Too hard</p>
            </div>
            <div className=" h-[40px] w-[1px] bg-zinc-800" />
            <div
              className={cn(
                "flex flex-col text-center cursor-pointer hover:bg-zinc-800 mx-2 py-2 rounded-md w-full",
                { "bg-zinc-800": mood === 2 }
              )}
              onClick={() => setMood(2)}
            >
              <span className="text-3xl">🙂</span> <p>Just right</p>
            </div>
            <div className=" h-[40px] w-[1px] bg-zinc-800" />
            <div
              className={cn(
                "flex flex-col text-center cursor-pointer hover:bg-zinc-800 mx-2 py-2 rounded-md w-full",
                { "bg-zinc-800": mood === 3 }
              )}
              onClick={() => setMood(3)}
            >
              <span className="text-3xl">😄</span> <p>Too easy</p>
            </div>
          </div>
        </div>

        <div className="w-full items-center justify-center flex mt-12 px-5">
          <button
            className="sm:w-[70%] w-full  p-2 bg-zinc-800 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-lg flex items-center justify-center gap-5"
            onClick={() => handleEndWorkout(totalTime)}
          >
            Next{" "}
            {isLoading || isLoadingChallenge ? (
              <Loader2 className=" animate-spin" size={18} />
            ) : null}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ExerciseFinished;
