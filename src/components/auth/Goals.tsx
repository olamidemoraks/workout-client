import { cn } from "@/libs/utils";
import React, { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import Image from "next/image";

type GoalsProps = {
  handleUpdate: (value: any) => void;
  isLoading: boolean;
};

const goalList = [
  { goal: "lose weight", imageUrl: "/assets/weight.png" },
  { goal: "build muscles", imageUrl: "/assets/muscle.png" },
  { goal: "keep fit", imageUrl: "/assets/fit.png" },
];
const Goals: React.FC<GoalsProps> = ({ handleUpdate, isLoading }) => {
  const [goals, setGoals] = useState("");
  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-200px)] w-full">
      <h2 className=" text-2xl uppercase text-center font-semibold">
        What are your main <br /> goals?
      </h2>

      <div className="flex flex-col gap-8 w-full">
        {goalList.map(({ goal, imageUrl }) => (
          <div
            onClick={() => setGoals(goal)}
            className={cn(
              "capitalize hover:border-white relative transition-all px-3 py-2 border-4 border-zinc-800 w-full lg:w-[500px] rounded-[.6rem] h-[100px] cursor-pointer flex items-start",
              {
                " border-yellow-500 hover:border-yellow-500": goal === goals,
              }
            )}
            key={goal}
          >
            <p className=" text-lg font-semibold">{goal}</p>
            <div className="h-[20px] w-[200px] -top-[42px] right-1 z-10 absolute">
              <Image
                src={imageUrl}
                alt={goal}
                height={500}
                width={500}
                className=" object-cover "
              />
            </div>
            <CheckCircle2
              className={cn(" absolute top-2 right-2", {
                hidden: goal !== goals,
              })}
            />
          </div>
        ))}
      </div>

      <div className=" text-center space-y-4 w-full flex-col items-center flex">
        <button
          type="button"
          onClick={() => handleUpdate({ goals, steps: "level" })}
          className=" flex items-center justify-center px-8 disabled:bg-neutral-600 disabled:cursor-not-allowed bg-neutral-200 hover:bg-white cursor-pointer text-black  rounded-full py-3 w-[200px] sm:min-w-[350px] text-lg font-medium gap-2 "
        >
          {isLoading ? (
            <span className="text-black">
              Next{" "}
              <Loader2
                className=" animate-spin ml-2 inline-block "
                color="black"
              />
            </span>
          ) : (
            "Next"
          )}
        </button>
      </div>
    </div>
  );
};
export default Goals;
