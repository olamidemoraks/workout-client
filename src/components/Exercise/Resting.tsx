import { cn } from "@/libs/utils";
import { Plus } from "lucide-react";
import React from "react";
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
};

const Resting: React.FC<RestingProps> = ({
  padTo2Digits,
  restTime,
  setRestTime,
  playWhisleSound,
  setIsResting,
  currentIndex,
  exerciseLength,
  currentExercise,
}) => {
  const handleSkip = () => {
    playWhisleSound();
    setIsResting(false);
  };
  return (
    <div className="flex lg:flex-row flex-col w-full items-center justify-center gap-10">
      <div className=" flex flex-col items-center justify-evenly   md:p-8 p-3 lg:w-[60%] w-full   ">
        <div className=" flex flex-col items-center justify-evenly bg-zinc-900 rounded-lg w-full py-8  gap-5">
          <p className=" text-2xl uppercase font-bold flex items-center gap-2">
            Rest
          </p>

          <div className="h-[120px] w-[120px] relative flex items-center justify-center ">
            <div className=" h-full absolute w-full z-10 rounded-full flex items-center justify-center border border-zinc-800 bg-zinc-900">
              <p className=" md:text-4xl text-3xl font-bold">
                {" "}
                {padTo2Digits(Math.floor(restTime / 60))}:
                {padTo2Digits(restTime % 60)}
              </p>
            </div>
            <div
              className={cn(
                "h-[75px] w-[75px] bg-gradient-to-r  from-indigo-600 to-blue-600 rounded-full animate-ping ",
                { "from-orange-600 to-red-600": restTime < 5 }
              )}
            />
          </div>

          <div className="flex items-center justify-center gap-10 w-full">
            <button
              onClick={() => setRestTime((prev) => prev + 20)}
              className="sm:py-2 py-1 sm:px-5 px-2 justify-center text-lg bg-emerald-500  rounded-md   transition duration-200 flex items-center gap-2"
            >
              <Plus />
              20s
            </button>
            <button
              onClick={handleSkip}
              className="sm:py-2 py-1 sm:px-5 px-2 justify-center text-lg hover:bg-zinc-700 bg-zinc-800 text-emerald-500  rounded-md   transition duration-200 flex items-center gap-2"
            >
              Skip
            </button>
          </div>
        </div>
        <div className=" opacity-60">
          <Image
            src={"/assets/stability-ball.svg"}
            alt=""
            height={250}
            width={250}
            className=""
          />
        </div>

        <div className="w-full rounded-md bg-zinc-800 p-3 flex items-center justify-between">
          <div>
            <p className=" text-neutral-400">
              Up Next {currentIndex + 1}/{exerciseLength}
            </p>
            <p className=" font-bold">{currentExercise?.name}</p>
          </div>
          <div>
            <div className="h-[60px] w-[80px] relative">
              <Image
                src={currentExercise?.image?.url ?? ""}
                alt="Next"
                fill
                className=" object-cover rounded-lg absolute"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Resting;
