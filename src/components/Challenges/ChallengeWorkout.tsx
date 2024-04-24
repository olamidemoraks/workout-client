"use client";
import { startChallenge } from "@/api/challenge";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";
import CurrentExercise from "../Exercise/CurrentExercise";

type ChallengeWorkoutProps = {
  id: string;
};

const ChallengeWorkout: React.FC<ChallengeWorkoutProps> = ({ id }) => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryFn: async () => await startChallenge(id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const workout: IWorkout = data?.workout as IWorkout;
  return (
    <div className="flex sm:flex-row flex-col gap-2  justify-center w-full">
      <div
        onClick={() => router.back()}
        className="sm:ml-2 ml-[5px] bg-zinc-900 rounded-lg h-[40px] w-[40px] flex items-center justify-center cursor-pointer hover:bg-blue-700"
      >
        <ArrowLeft />
      </div>
      <CurrentExercise workout={workout} workoutType="challenge" />
    </div>
  );
};
export default ChallengeWorkout;
