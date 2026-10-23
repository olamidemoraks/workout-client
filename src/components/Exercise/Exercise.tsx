"use client";
import { getWorkout } from "@/api/workout";
import React, { ReactNode } from "react";
import { useQuery } from "react-query";
import CurrentExercise from "./CurrentExercise";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { startChallenge } from "@/api/challenge";
import { getCustomWorkout } from "@/api/custom.workout";

type ExerciseProps = {
  id: string;
};

const Exercise: React.FC<ExerciseProps> = ({ id }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = (searchParams?.get("type") ?? "default") as
    | "default"
    | "challenge"
    | "customize";

  // Keys include the id so a second workout never starts with the previous
  // workout's cached exercises.
  const { data, isLoading } = useQuery({
    queryFn: async () => await getWorkout(id),
    queryKey: ["default exercise", id],
    refetchOnWindowFocus: false,
    enabled: type === "default" && !!id,
  });

  const { data: challengeData, isLoading: challengeLoading } = useQuery({
    queryFn: async () => await startChallenge(id),
    queryKey: ["challege exercise", id],
    refetchOnWindowFocus: false,
    enabled: type === "challenge" && !!id,
  });

  const { data: customizeData, isLoading: customizeLoading } = useQuery({
    queryFn: async () => await getCustomWorkout({ id }),
    queryKey: ["customize exercise", id],
    refetchOnWindowFocus: false,
    enabled: type === "customize" && !!id,
  });

  // if (type === "default") {
  //   workout = data?.workout;
  // } else if (type === "challenge") {
  //   workout = challengeData?.workout;
  // } else if (type === "customize") {
  //   workout = customizeData?.workout;
  // }

  if (isLoading || challengeLoading || customizeLoading) {
    return (
      <div className="w-full flex justify-center items-center h-[50vh]">
        <Loader2 className=" text-3xl text-white animate-spin" />
      </div>
    );
  }

  let workoutUI: ReactNode;

  switch (type) {
    case "default":
      workoutUI = (
        <CurrentExercise workout={data?.workout} workoutType={type} />
      );
      break;
    case "challenge":
      workoutUI = (
        <CurrentExercise workout={challengeData?.workout} workoutType={type} />
      );
      break;
    case "customize":
      workoutUI = (
        <CurrentExercise workout={customizeData?.workout} workoutType={type} />
      );
      break;
    default:
      break;
  }
  return (
    <div className="flex sm:flex-row flex-col gap-2  justify-center w-full">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Leave workout"
        title="Leave workout"
        className="sm:ml-2 ml-1 bg-zinc-900 rounded-lg h-[40px] w-[40px] shrink-0 flex items-center justify-center cursor-pointer hover:bg-emerald-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
      >
        <ArrowLeft />
      </button>
      {workoutUI}
    </div>
  );
};
export default Exercise;
