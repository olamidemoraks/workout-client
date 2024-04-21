"use client";
import React from "react";
import { useQuery } from "react-query";
import { getWorkout } from "@/api/workout";
import {
  AlarmCheck,
  AlarmClock,
  ArrowLeft,
  Loader2,
  Play,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/libs/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ExercisePreview from "../Exercise/ExercisePreview";

type ExerciseDisplayProps = {
  id: string;
};

const ExerciseDisplay: React.FC<ExerciseDisplayProps> = ({ id }) => {
  const { data, isLoading } = useQuery({
    queryFn: async () => await getWorkout(id),
    queryKey: "workoutPreview",
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const workout: IWorkout = data?.workout;
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center">
        <Loader2 className=" text-3xl text-white animate-spin" />
      </div>
    );
  }
  return <ExercisePreview workout={workout} />;
};
export default ExerciseDisplay;
