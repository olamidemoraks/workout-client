"use client";
import React from "react";
import { useQuery } from "react-query";
import { getWorkout } from "@/api/workout";
import {
  AlarmCheck,
  AlarmClock,
  ArrowLeft,
  Loader2,
  Play,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/libs/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ExerciseDisplayProps = {
  id: string;
};

const ExerciseDisplay: React.FC<ExerciseDisplayProps> = ({ id }) => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryFn: async () => await getWorkout(id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, "0");
  }

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center">
        <Loader2 className=" text-3xl text-white animate-spin" />
      </div>
    );
  }
  const workout: IWorkout = data?.workout;
  return (
    <div className="flex items-start justify-center  w-[100%]">
      <div
        onClick={() => router.back()}
        className="sm:ml-2 ml-3 bg-zinc-900 rounded-lg h-[40px] w-[40px] flex items-center justify-center cursor-pointer hover:bg-emerald-700"
      >
        <ArrowLeft />
      </div>
      <div className=" flex w-full px-3 flex-col items-center justify-center ">
        <div className="sm:h-[300px] h-[250px] md:w-[75%] w-full relative rounded-xl  ">
          <Image
            src={workout?.image?.url}
            alt={workout?.name}
            fill
            className="absolute object-cover rounded-xl"
          />
          <div className="flex flex-col justify-between h-full w-full space-y-2 bg-gradient-to-r  absolute p-6 rounded-xl from-black/60 to-zinc-900/30">
            <div>
              <p className="font-bold uppercase md:text-4xl text-2xl text-neutral-300">
                {workout?.name}
              </p>
            </div>
            <div className="flex flex-col  gap-6">
              <div className="flex  items-center gap-2">
                {Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <Zap
                      key={index}
                      className={cn(" fill-neutral-600", {
                        "fill-emerald-600 ": index < workout?.difficult_level,
                      })}
                      size={30}
                      color={
                        index < workout?.difficult_level ? "#059669" : "#525252"
                      }
                    />
                  ))}
              </div>
              <div className="flex gap-3 items-center">
                <div className="flex items-center gap-1 text-neutral-300">
                  <AlarmCheck color="#059669" />
                  {workout?.estimate_time} minutes
                </div>
                <div className="h-4 w-[1px] bg-neutral-600" />
                <p className=" text-base  text-neutral-300">
                  {workout?.exercises?.length} Varient
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:w-[75%] w-full mt-12  mb-12">
          <div className="flex items-center justify-between mb-4">
            <p className=" text-2xl font-semibold">Exercises</p>
            <Link
              href={`/exercise/${workout?._id}`}
              className="flex items-center gap-1 bg-emerald-700 p-2 px-4 rounded-lg w-fit text-base uppercase"
            >
              Start <Play className=" fill-white" size={17} />
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full ">
            {workout?.exercises?.map((exercise, index) => (
              <div key={exercise?._id} className="flex items-center gap-2">
                <p className=" italic text-xl font-semibold">#{index + 1}</p>
                <div className=" w-full flex gap-3 p-2 px-4 rounded-lg h-[80px] bg-gradient-to-r   from-zinc-900/60 to-zinc-900/30">
                  <Image
                    src={exercise?.image?.url}
                    alt={exercise?.name}
                    height={50}
                    width={70}
                    className=" object-cover rounded-md"
                  />
                  <div>
                    <p className=" text-xl">{exercise?.name}</p>
                    <p className=" text-neutral-300">
                      {exercise.time_base
                        ? `${
                            padTo2Digits(
                              Math.floor(exercise?.repetition / 60)
                            ) +
                            ":" +
                            padTo2Digits(exercise?.repetition % 60)
                          }`
                        : `x ${exercise?.repetition}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExerciseDisplay;
