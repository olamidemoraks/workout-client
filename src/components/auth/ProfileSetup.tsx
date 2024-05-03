"use client";
import { updateProfile, userProfile } from "@/api/user";
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
  });

  useEffect(() => {
    if (profile) {
      setSteps(profile?.steps);
    }
  }, [profile]);

  const handleProfileUpdate = (value: any) => {
    mutate({ value });
  };

  let content;
  switch (steps) {
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
        <Age handleUpdate={handleProfileUpdate} isLoading={isLoading} />
      );
      break;
    case "goal":
      content = (
        <Goals handleUpdate={handleProfileUpdate} isLoading={isLoading} />
      );
      break;
    case "level":
      content = (
        <Level handleUpdate={handleProfileUpdate} isLoading={isLoading} />
      );
      break;
    case "weight":
      content = (
        <Weight handleUpdate={handleProfileUpdate} isLoading={isLoading} />
      );
      break;
    default:
      break;
  }
  return (
    <div className=" flex flex-col items-center  h-[100vh] py-20 gap-8 ">
      <ProgressStep step={steps} />
      <div className=" h-full">{content}</div>
    </div>
  );
};

const ProgressStep = ({ step = "gender" }: { step: string }) => {
  // start, gender, age, weight, level, completed
  const steps: any = {
    start: 0,
    gender: 1,
    age: 2,
    goal: 3,
    level: 4,
    weight: 5,
  };

  return (
    <div className="flex items-center gap-1">
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <div
            className={cn(
              "h-[4px] md:w-14 sm:w-12 w-7 bg-zinc-700 rounded-full",
              {
                "bg-emerald-400": index < steps[step],
              }
            )}
            key={index}
          />
        ))}
    </div>
  );
};

export default ProfileSetup;
