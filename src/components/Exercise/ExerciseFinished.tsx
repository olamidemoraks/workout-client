"use client";
import { createActivity } from "@/api/activity";
import { completedChallenge } from "@/api/challenge";
import useProfile from "@/hooks/useProfile";
import { cn } from "@/libs/utils";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";

type ExerciseFinishedProps = {
  endTime: Date;
  startTime: Date;
  exerciseLength: number;
  workoutName: string;
  workoutId: string;
  workoutType: "default" | "challenge" | "customize";
};

const ExerciseFinished: React.FC<ExerciseFinishedProps> = ({
  endTime,
  exerciseLength,
  startTime,
  workoutName,
  workoutId,
  workoutType,
}) => {
  const router = useRouter();
  const [mood, setMood] = useState(2);
  const { profile } = useProfile();
  const [isKG, setIsKG] = useState(true);
  const [weight, setWeight] = useState<any>();
  const [weightEdited, setWeightEdited] = useState(false);

  const queryClient = useQueryClient();
  // Streak queries are cached for a few minutes, so refresh them once a
  // workout is saved.
  const refreshStreak = () => {
    queryClient.invalidateQueries("streak");
    queryClient.invalidateQueries("activity-days");
  };

  const onSaveError = (error: any) => {
    toast.error(error?.message ?? "Couldn't save your workout. Try again.");
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: createActivity,
    onSuccess: () => {
      refreshStreak();
      router.replace("/profile");
    },
    onError: onSaveError,
  });
  const { mutate: challegeMutate, isLoading: isLoadingChallenge } = useMutation(
    {
      mutationFn: completedChallenge,
      onSuccess: () => {
        refreshStreak();
        router.replace("/profile");
      },
      onError: onSaveError,
    }
  );
  const isSaving = isLoading || isLoadingChallenge;

  const handleEndWorkout = (totalTime: number) => {
    // Weight is stored in kg (like onboarding and edit profile). Send the
    // stored value back untouched unless the user changed it, so a kg -> lb
    // -> kg round trip doesn't create a fake weight change.
    const weightToSave =
      weightEdited && Number(weight) > 0
        ? isKG
          ? weight
          : (Number(weight) / 2.205).toFixed(2)
        : profile?.weight;
    const data = {
      workoutId,
      totalTime,
      weight: weightToSave,
      workoutType,
      feedback: mood,
    };
    if (workoutType === "challenge") {
      challegeMutate({
        challengeId: workoutId,
        workoutName,
        totalTime,
        weight: weightToSave,
      });
    } else {
      mutate({ data });
    }
  };

  useEffect(() => {
    if (profile) {
      const showInLb = profile?.weightMeasure === "lb";
      const storedWeight = Number(profile?.weight);
      setIsKG(!showInLb);
      setWeight(
        storedWeight > 0
          ? showInLb
            ? (storedWeight * 2.205).toFixed(1)
            : profile.weight
          : ""
      );
    }
  }, [profile]);

  // Total workout time in seconds.
  const totalTime = Math.max(
    0,
    Math.round((endTime.getTime() - startTime.getTime()) / 1000)
  );
  const hours = Math.floor(totalTime / 3600);
  const minutes = Math.floor((totalTime % 3600) / 60);
  const seconds = totalTime % 60;
  const formattedTime = hours
    ? `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    : `${minutes}:${String(seconds).padStart(2, "0")}`;

  const moods = [
    { value: 1, emoji: "🥴", label: "Too hard" },
    { value: 2, emoji: "🙂", label: "Just right" },
    { value: 3, emoji: "😄", label: "Too easy" },
  ];
  return (
    <div className=" w-full flex flex-col  items-center justify-center">
      <div className="lg:w-[60%] w-full ">
        <div className="relative w-full z-10">
          <Image
            src={"/assets/gears.jpg"}
            alt="completed"
            height={500}
            width={600}
            className=" object-cover w-full sm:h-[250px] h-[200px] rounded-lg brightness-50"
          />
          <div className="absolute sm:w-[50%] w-[70%] top-0  px-5 py-5">
            <p className=" md:text-4xl text-2xl font-semibold">
              Nice, you&apos;ve completed your workout!
            </p>
            <p className=" md:text-lg text-base mt-3">{workoutName}</p>
          </div>
        </div>
        <div className=" relative w-full  flex justify-center -mt-[30px] z-20">
          <div className=" bg-zinc-900 p-3 w-[70%] rounded-md flex items-center justify-evenly">
            <div className=" text-center">
              <small className="text-zinc-400">
                {exerciseLength === 1 ? "Exercise" : "Exercises"}
              </small>
              <p className="sm:text-3xl text-xl font-semibold tabular-nums">
                {exerciseLength}
              </p>
            </div>
            <div className=" h-10 w-[1px] bg-zinc-800" />
            <div className=" text-center">
              <small className="text-zinc-400">Time</small>
              <p className="sm:text-3xl text-xl font-semibold tabular-nums">
                {formattedTime}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-zinc-900 mt-5 rounded-lg p-3 px-5 gap-3 text-center mx-3">
          <p id="mood-label" className="text-lg">How do you feel?</p>
          <p className=" text-sm tracking-wide text-neutral-300">
            Your feedback helps us suggest workouts that suit you.
          </p>
          <div
            role="radiogroup"
            aria-labelledby="mood-label"
            className="flex justify-evenly items-center w-full mt-2"
          >
            {moods.map((option, index) => (
              <React.Fragment key={option.value}>
                {index > 0 && <div className=" h-[40px] w-[1px] bg-zinc-800" />}
                <button
                  type="button"
                  role="radio"
                  aria-checked={mood === option.value}
                  onClick={() => setMood(option.value)}
                  className={cn(
                    "flex flex-col items-center text-center cursor-pointer hover:bg-zinc-800 mx-2 py-2 rounded-md w-full border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
                    { "bg-zinc-800 border-emerald-500/60": mood === option.value }
                  )}
                >
                  <span className="text-3xl" aria-hidden>
                    {option.emoji}
                  </span>
                  <span className=" sm:text-base text-sm">{option.label}</span>
                </button>
              </React.Fragment>
            ))}
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-2 my-4  ">
            <label htmlFor="weight" className=" font-semibold">
              Weight
            </label>
            <div className="flex gap-1 w-full">
              <input
                type="text"
                inputMode="decimal"
                className="pb-2 focus:outline-none border-b border-zinc-400 focus:border-emerald-500 transition-colors w-full  bg-transparent"
                id="weight"
                placeholder={isKG ? "KG" : "LB"}
                value={weight}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) {
                    return;
                  }
                  setWeight(e.target.value);
                  setWeightEdited(true);
                }}
              />
              <div
                role="group"
                aria-label="Weight unit"
                className="flex gap-2 border border-blue-700 rounded-lg  items-center"
              >
                <button
                  type="button"
                  aria-pressed={isKG}
                  className={cn(
                    " px-2 transition duration-200 cursor-pointer h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
                    {
                      " bg-blue-700": isKG,
                    }
                  )}
                  onClick={() => {
                    setWeight((prev: any) => {
                      if (!isKG && prev) {
                        return Math.floor(prev / 2.205).toFixed(0);
                      }
                      return prev;
                    });
                    setIsKG(true);
                  }}
                >
                  KG
                </button>

                <button
                  type="button"
                  aria-pressed={!isKG}
                  className={cn(
                    " px-2 transition duration-200 cursor-pointer h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
                    {
                      " bg-blue-700": !isKG,
                    }
                  )}
                  onClick={() => {
                    setWeight((prev: any) => {
                      if (isKG && prev) {
                        return (prev * 2.205).toFixed(2);
                      }
                      return prev;
                    });
                    setIsKG(false);
                  }}
                >
                  LB
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full items-center justify-center flex mt-12 px-5">
          <button
            className="sm:w-[70%] w-full p-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-lg flex items-center justify-center gap-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            onClick={() => handleEndWorkout(totalTime)}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                Saving <Loader2 className=" animate-spin" size={18} />
              </>
            ) : (
              "Save workout"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ExerciseFinished;
