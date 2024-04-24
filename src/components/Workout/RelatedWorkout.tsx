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
    queryKey: "relatedWorkout",
  });

  const workouts: IWorkout[] = data?.workouts;

  return (
    <div className="p-4 px-10 w-full h-full overflow-x-hidden">
      <div className=" grid  lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {isLoading ? (
          <CustomLoader height="h-[200px]" amount={3} weight="w-full" />
        ) : (
          <>
            {workouts?.map((workout) => (
              <WorkoutCard workout={workout} key={workout._id} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
export default RelatedWorkout;
