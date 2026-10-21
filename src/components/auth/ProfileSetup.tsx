"use client";
import { updateProfile } from "@/api/user";
import useProfile from "@/hooks/useProfile";
import { cn } from "@/libs/utils";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Gender from "./Gender";
import Age from "./Age";
import Goals from "./Goals";
import Level from "./Level";
import Weight from "./Weight";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import BrandMark from "./BrandMark";

// Order of the onboarding steps; the server stores the current one in `user.steps`.
const STEPS = ["gender", "age", "goal", "level", "weight"];

const ProfileSetup = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { profile, isLoading: profileLoading } = useProfile();
  const [steps, setSteps] = useState("gender");
  const { mutate, isLoading } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (value) => {
      queryClient.invalidateQueries("profile");
      if (value?.user?.steps === "done") {
        router.push("/");
        return;
      }
      setSteps(value?.user?.steps);
    },
    onError: () => {
      toast.error("Something went wrong. Try again!");
    },
  });

  useEffect(() => {
    if (profile) {
      setSteps(profile?.steps);
    }
  }, [profile]);

  const handleProfileUpdate = (value: any) => {
    mutate({ value });
  };

  // "start" (or anything unexpected) begins at the first step.
  const stepIndex = Math.max(STEPS.indexOf(steps), 0);
  const handleBack = () => setSteps(STEPS[stepIndex - 1]);

  let content;
  switch (STEPS[stepIndex]) {
    case "gender":
      content = (
        <Gender
          handleUpdate={handleProfileUpdate}
          genderValue={profile?.gender}
          isLoading={isLoading}
        />
      );
      break;
    case "age":
      content = (
        <Age
          handleUpdate={handleProfileUpdate}
          ageValue={profile?.age}
          onBack={handleBack}
          isLoading={isLoading}
        />
      );
      break;
    case "goal":
      content = (
        <Goals
          handleUpdate={handleProfileUpdate}
          goalValue={profile?.goals}
          onBack={handleBack}
          isLoading={isLoading}
        />
      );
      break;
    case "level":
      content = (
        <Level
          handleUpdate={handleProfileUpdate}
          levelValue={profile?.level}
          onBack={handleBack}
          isLoading={isLoading}
        />
      );
      break;
    case "weight":
      content = (
        <Weight
          handleUpdate={handleProfileUpdate}
          onBack={handleBack}
          isLoading={isLoading}
        />
      );
      break;
    default:
      break;
  }
  return (
    <div className="relative flex min-h-screen flex-col bg-zinc-950">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -top-48 left-1/2 h-[480px] w-[760px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />
      </div>

      <header className="relative z-10 mx-auto w-full max-w-xl px-4 pt-6 sm:px-0">
        <div className="flex items-center justify-between">
          <BrandMark size={64} />
          <p className="text-sm font-medium text-zinc-400">
            Step {stepIndex + 1} of {STEPS.length}
          </p>
        </div>
        <ProgressStep current={stepIndex} total={STEPS.length} />
      </header>

      <main className="relative z-10 flex flex-1 flex-col px-4 pt-10 sm:px-6 sm:pt-14">
        {profileLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <Loader2 size={28} className="animate-spin stroke-emerald-400" />
          </div>
        ) : (
          content
        )}
      </main>
    </div>
  );
};

const ProgressStep = ({ current, total }: { current: number; total: number }) => {
  return (
    <div
      role="progressbar"
      aria-label="Profile setup progress"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      className="mt-5 flex gap-1.5"
    >
      {Array.from({ length: total }, (_, index) => (
        <div
          key={index}
          className={cn(
            "h-1 flex-1 rounded-full bg-zinc-800 transition-colors duration-300",
            { "bg-emerald-400": index <= current }
          )}
        />
      ))}
    </div>
  );
};

export default ProfileSetup;
