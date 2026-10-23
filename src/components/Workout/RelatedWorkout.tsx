"use client";
import { freemiumWorkout } from "@/api/workout";
import React from "react";
import { useQuery } from "react-query";
import WorkoutCard from "./WorkoutCard";
import { cn } from "@/libs/utils";
import CustomLoader from "../Common/CustomLoader";

type RelatedWorkoutProps = {
  name: string;
};

const RelatedWorkout: React.FC<RelatedWorkoutProps> = ({ name }) => {
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      return await freemiumWorkout(name);
    },
    queryKey: ["relatedWorkout", name],
  });

  const workouts: IWorkout[] = data?.workouts;

  return (
    <div className="p-4 md:px-10  w-full h-full">
      <div className=" grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {isLoading ? (
          <CustomLoader height="h-[250px]" amount={3} weight="w-full" />
        ) : (
          <>
            {workouts?.map((workout) => (
              <WorkoutCard workout={workout} key={workout._id} />
            ))}
          </>
        )}
      </div>
      {!isLoading && !workouts?.length && (
        <p className="rounded-lg border border-dashed border-zinc-800 p-10 text-center text-zinc-400">
          No workouts in this focus area yet.
        </p>
      )}
    </div>
  );
};
export default RelatedWorkout;
