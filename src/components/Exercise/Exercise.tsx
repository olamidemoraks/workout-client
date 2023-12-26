"use client";
import { getWorkout } from "@/api/workout";
import React from "react";
import { useQuery } from "react-query";
import CurrentExercise from "./CurrentExercise";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type ExerciseProps = {
  id: string;
};

const Exercise: React.FC<ExerciseProps> = ({ id }) => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryFn: async () => await getWorkout(id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const workout: IWorkout = data?.workout as IWorkout;
  return (
    <div className="flex sm:flex-row flex-col gap-2  justify-center w-full">
      <div
        onClick={() => router.back()}
        className="sm:ml-2 ml-1 bg-zinc-900 rounded-lg h-[40px] w-[40px] flex items-center justify-center cursor-pointer hover:bg-emerald-700"
      >
        <ArrowLeft />
      </div>
      <CurrentExercise workout={workout} />
    </div>
  );
};
export default Exercise;
