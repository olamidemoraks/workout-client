import { cn } from "@/libs/utils";
import Image from "next/image";
import React, { useState } from "react";
import { OptionCard, StepLayout } from "./OnboardingControls";

type GenderProps = {
  handleUpdate: (value: any) => void;
  genderValue?: string | null;
  isLoading: boolean;
};

const genders = [
  { value: "male", label: "Male", imageUrl: "/assets/male.png" },
  { value: "female", label: "Female", imageUrl: "/assets/female.png" },
];

const Gender: React.FC<GenderProps> = ({
  handleUpdate,
  genderValue,
  isLoading,
}) => {
  const [gender, setGender] = useState(genderValue ?? "");

  return (
    <StepLayout
      title="What's your gender?"
      description="This helps us personalise your workouts."
      onNext={() => handleUpdate({ gender, steps: "age" })}
      nextDisabled={!gender}
      isLoading={isLoading}
    >
      <div
        role="radiogroup"
        aria-label="Gender"
        className="grid grid-cols-2 gap-3 sm:gap-4"
      >
        {genders.map(({ value, label, imageUrl }) => {
          const selected = gender === value;
          return (
            <OptionCard
              key={value}
              selected={selected}
              onClick={() => setGender(value)}
              className="flex flex-col overflow-hidden"
            >
              <div className="relative h-56 w-full sm:h-72">
                <div
                  className={cn(
                    "absolute inset-x-8 bottom-6 top-12 rounded-full blur-3xl transition-colors duration-300",
                    selected ? "bg-emerald-500/30" : "bg-zinc-700/20"
                  )}
                />
                <Image
                  src={imageUrl}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 45vw, 280px"
                  className="object-contain object-bottom pt-6"
                />
              </div>
              <span className="w-full border-t border-zinc-800 py-3 text-center font-semibold">
                {label}
              </span>
            </OptionCard>
          );
        })}
      </div>
    </StepLayout>
  );
};
export default Gender;
