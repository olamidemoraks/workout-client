"use client";
import { startChallenge } from "@/api/challenge";
import { ArrowLeft, Loader2, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";
import ExercisePreview from "../Exercise/ExercisePreview";

type ChallengesPreviewProps = {
  id: string;
};

const ChallengesPreview: React.FC<ChallengesPreviewProps> = ({ id }) => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryFn: async () => await startChallenge(id),
  });

  const workout: IWorkout = data?.workout as IWorkout;

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center">
        <Loader2 className=" text-3xl text-white animate-spin" />
      </div>
    );
  }
  return <ExercisePreview workout={workout} type="challenge" />;
};
export default ChallengesPreview;
