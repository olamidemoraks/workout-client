import React from "react";
import Image from "next/image";
import { Zap, Skull, Clock, Play } from "lucide-react";
import { cn } from "@/libs/utils";
import Link from "next/link";
import { difficultyColor } from "@/utils/data";
type WorkoutCardProps = {
  workout: IWorkout;
};

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const levels: any = {
    1: "Beginner",
    2: "Intermediate",
    3: "Advanced",
  };

  return (
    // <Link
    //   href={`/workouts/preview/${workout._id}`}
    //   className="sm:h-[300px] h-[250px] w-full relative rounded-xl overflow-y-auto cursor-pointer hover:ring-4 ring-emerald-400/40"
    // >
    //   <Image
    //     src={workout?.image?.url}
    //     alt={workout?.name}
    //     fill
    //     className="absolute object-cover rounded-xl brightness-75"
    //   />
    //   <div className="bottom-0 flex flex-col  w-full space-y-1 bg-gradient-to-t from-black/60 via-black/60 to-transparent absolute p-6 rounded-lg ">
    //     <p className="font-bold uppercase md:text-3xl text-2xl text-neutral-300">
    //       {workout?.name}
    //     </p>

    //     <div className="flex justify-between w-full items-center mt-2">
    //       <div className="flex items-center gap-1 mt-3">
    //         {Array(3)
    //           .fill(0)
    //           .map((_, index) => (
    //             <Zap
    //               key={index}
    //               className={cn(" fill-neutral-600", {
    //                 "fill-emerald-600 ": index < workout?.difficult_level,
    //               })}
    //               size={18}
    //               color={
    //                 index < workout?.difficult_level ? "#059669" : "#525252"
    //               }
    //             />
    //           ))}
    //       </div>
    //       <div className="flex gap-1">
    //         <Clock color="#059669" />
    //         <p className="text-neutral-300">{workout.estimate_time} min</p>
    //       </div>
    //     </div>
    //   </div>
    // </Link>
    <div className={cn("flex flex-col w-full")} key={workout?._id}>
      <div
        className={
          " cursor-pointer fill-rose-500 group snap-start w-full h-[200px]  relative  p-3 flex flex-col items-center justify-center border  border-zinc-900 rounded-lg  transition duration-200"
        }
      >
        <Image
          src={`${workout?.image?.url}`}
          alt={workout?.name}
          fill
          className=" w-full h-full  object-cover rounded-md group-hover:brightness-90  -z-[2]"
        />
        {/* <div className="absolute top-3 right-3 flex gap-2 items-center">
    <small className="font-semibold">Owner</small>
  </div> */}
        <Link
          href={`/workouts/preview/${workout._id}`}
          className="md:hidden flex flex-row items-center justify-center w-full h-full group-hover:flex"
        >
          <div className="h-[35px] w-[35px] flex items-center justify-center bg-zinc-700/30 backdrop-blur-sm group-hover:bg-blue-500 rounded-[13px] transition-colors duration-200 ">
            <Play size={17} fill="#fff" />
          </div>
        </Link>
      </div>
      <div className="h-fit w-full flex justify-between items-start md:mt-2 mt-1">
        <div className="flex flex-col">
          <p className="font-semibold md:text-lg text-sm  uppercase  text-center">
            {workout?.name}
          </p>
          {/* <div className="flex gap-1 items-center ">
            <Clock color="#3b82f6" size={15} />
            <p className="text-neutral-300">{workout.estimate_time} min</p>
          </div> */}
        </div>

        <div className="flex items-center">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <Zap
                key={index}
                // className={cn(" fill-neutral-600", {
                //  "": index < workout?.difficult_level,
                // })}
                className={`${
                  index < workout?.difficult_level
                    ? difficultyColor[workout?.difficult_level].fill
                    : "fill-neutral-600"
                }`}
                size={13 + index * 2}
                color={
                  index < workout?.difficult_level
                    ? difficultyColor[workout?.difficult_level].border
                    : "#525252"
                }
              />
            ))}
        </div>
      </div>
    </div>
  );
};
export default WorkoutCard;
