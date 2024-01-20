"use client";
import { freemiumWorkout } from "@/api/workout";
import React from "react";
import { useQuery } from "react-query";
import WorkoutCard from "./WorkoutCard";
import { cn } from "@/libs/utils";

type RelatedWorkoutProps = {
  name: string;
};

const RelatedWorkout: React.FC<RelatedWorkoutProps> = ({ name }) => {
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      return await freemiumWorkout(name);
    },
  });

  const workouts: IWorkout[] = data?.workouts;
  return (
    <div className="p-4 px-10 w-full h-full overflow-x-hidden">
      <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  mt-10 gap-8">
        {workouts?.map((workout) => (
          <div className="flex gap-5" key={workout._id}>
            {/* <div className="flex flex-col gap-4 items-center">
              <div
                className={cn(" h-5 w-5  rounded-full  ring-4 p-2", {
                  "ring-sky-700/70": workout.difficult_level === 1,
                  "ring-blue-700/70": workout.difficult_level === 2,
                  "ring-red-700/70": workout.difficult_level === 3,
                })}
              />
              <div
                className={cn(" h-full w-2  rounded-full", {
                  "bg-gradient-to-b  from-sky-700 to-transparent":
                    workout.difficult_level === 1,
                  "bg-gradient-to-b from-blue-700 to-transparent":
                    workout.difficult_level === 2,
                  "bg-gradient-to-b from-red-700 to-transparent":
                    workout.difficult_level === 3,
                })}
              />
            </div> */}
            <WorkoutCard workout={workout} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default RelatedWorkout;
