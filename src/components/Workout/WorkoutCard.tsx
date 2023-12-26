import React from "react";
import Image from "next/image";
import { Zap, Skull, Clock } from "lucide-react";
import { cn } from "@/libs/utils";
import Link from "next/link";
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
    <Link
      href={`/workout/${workout._id}`}
      className="sm:h-[300px]  h-[250px] w-full relative rounded-xl overflow-y-auto cursor-pointer hover:ring-4 ring-emerald-700/40"
    >
      <Image
        src={workout?.image?.url}
        alt={workout?.name}
        fill
        className="absolute object-cover rounded-xl brightness-75"
      />
      <div className="bottom-0 flex justify-between items-end w-full space-y-1 bg-gradient-to-t from-black/60 via-black/60 to-transparent absolute p-6 rounded-lg ">
        <div>
          <p className="font-bold uppercase md:text-3xl text-2xl text-neutral-300">
            {workout?.name}
          </p>
          <p className=" text-neutral-300 font-semibold">
            {levels[workout?.difficult_level]}
          </p>
          <div className="flex items-center gap-1">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <Zap
                  key={index}
                  className={cn(" fill-neutral-600", {
                    "fill-emerald-600 ": index < workout?.difficult_level,
                  })}
                  size={25}
                  color={
                    index < workout?.difficult_level ? "#059669" : "#525252"
                  }
                />
              ))}
          </div>

          <p className=" text-base pl-1 text-neutral-300">
            {workout?.exercises?.length} Varient
          </p>
        </div>
        <div className="flex gap-1">
          <Clock color="#059669" />
          <p className="text-neutral-300">{workout.estimate_time} min</p>
        </div>
      </div>
    </Link>
  );
};
export default WorkoutCard;
