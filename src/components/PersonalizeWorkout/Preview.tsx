/* eslint-disable @next/next/no-img-element */
import { cn } from "@/libs/utils";
import { Edit3, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

type PreviewProps = {
  workouts: IExercise[];
  title: string;
  image: string;
  removeWorkout: (id: number) => void;
  setSteps: () => void;
};

const Preview: React.FC<PreviewProps> = ({
  image,
  title,
  workouts,
  removeWorkout,
  setSteps,
}) => (
  <div className="flex flex-col gap-4 w-full items-center lg:w-[80%] ">
    <div className=" h-[200px] w-full relative mb-4 flex items-center justify-center">
      <div
        onClick={setSteps}
        className="absolute top-3 right-4 z-10 hover:bg-zinc-900 rounded p-2 cursor-pointer"
      >
        <Edit3 />
      </div>
      <img
        src={image}
        className="absolute h-full w-full object-cover brightness-75"
      />
      <p className=" text-3xl absolute font-semibold capitalize ">
        {title}{" "}
        <div className="w-full flex">
          <div className="w-[70%] rounded h-[4px] bg-emerald-500" />
          <div className="w-[20%] rounded h-[4px] bg-emerald-500 ml-[0.2rem]" />
          <div className="w-[10%] rounded h-[4px] bg-emerald-500 ml-[0.2rem]" />
        </div>
      </p>
    </div>

    {workouts.map((workout, index) => (
      <div
        key={index}
        className={cn(
          "flex  justify-between gap-2   px-3  items-center transition  bg-zinc-900/50 rounded w-full h-[65px]"
        )}
      >
        <div className=" flex gap-2 items-center w-[50%] ">
          <div className="min-w-[75px] h-[60px] relative">
            <Image
              src={workout?.image?.url}
              alt={workout?.name}
              fill
              loading="lazy"
              className=" object-cover rounded-sm absolute"
            />
          </div>
          <p className="md:text-base text-sm truncate sm:w-full w-[70%] ">
            {workout?.name}
          </p>
        </div>
        <div className=" flex gap-2 items-center  ">
          <div className=" flex sm:gap-2 gap-1 items-center sm:flex-row flex-col ">
            <p className="md:text-base sm:text-base text-[10px]">
              {!workout?.time_base ? "Reps" : "Duration"} {workout?.repetition}
            </p>
            <div className="h-[10px] w-1 sm:block hidden bg-zinc-800" />
            <p className="sm:text-base text-[10px]">Sets {workout?.sets}</p>
            <div className="h-[10px] w-1 sm:block hidden bg-zinc-800" />
            <p className="sm:text-base text-[10px]">Rest {workout?.rest}</p>
          </div>
          <button
            onClick={() => removeWorkout(index)}
            className="hover:bg-red-800 rounded sm:p-2 p-1 ml-1 cursor-pointer"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    ))}
  </div>
);
export default Preview;
