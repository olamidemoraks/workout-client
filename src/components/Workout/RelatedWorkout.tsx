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
      <div className=" grid  lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {workouts?.map((workout) => (
          <div className="flex gap-5" key={workout._id}>
            <WorkoutCard workout={workout} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default RelatedWorkout;
