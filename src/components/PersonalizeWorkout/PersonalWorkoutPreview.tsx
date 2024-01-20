"use client";
import { getCustomWorkout } from "@/api/custom.workout";
import React from "react";
import { useQuery } from "react-query";
import ExercisePreview from "../Exercise/ExercisePreview";
import { Loader2 } from "lucide-react";

type PersonalWorkoutPreviewProps = {
  id: string;
};

const PersonalWorkoutPreview: React.FC<PersonalWorkoutPreviewProps> = ({
  id,
}) => {
  const { data, isLoading } = useQuery({
    queryFn: async () => await getCustomWorkout({ id }),
    enabled: !!id,
  });

  const workout: IWorkout = data?.workout;

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center">
        <Loader2 className=" text-3xl text-white animate-spin" />
      </div>
    );
  }
  return <ExercisePreview workout={workout} type="customize" />;
};
export default PersonalWorkoutPreview;
