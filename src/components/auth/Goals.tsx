import React, { useState } from "react";
import Image from "next/image";
import { OptionCard, StepLayout } from "./OnboardingControls";

type GoalsProps = {
  handleUpdate: (value: any) => void;
  isLoading: boolean;
  goalValue?: string;
  onBack?: () => void;
};

const goalList = [
  {
    goal: "lose weight",
    title: "Lose weight",
    description: "Burn fat and get leaner",
    imageUrl: "/assets/weight.png",
  },
  {
    goal: "build muscles",
    title: "Build muscle",
    description: "Get stronger and add size",
    imageUrl: "/assets/muscle.png",
  },
  {
    goal: "keep fit",
    title: "Keep fit",
    description: "Stay active and feel good",
    imageUrl: "/assets/fit.png",
  },
];

const Goals: React.FC<GoalsProps> = ({
  handleUpdate,
  isLoading,
  goalValue,
  onBack,
}) => {
  const [goals, setGoals] = useState(goalValue ?? "");
  return (
    <StepLayout
      title="What's your main goal?"
      description="Pick the one that matters most to you right now."
      onBack={onBack}
      onNext={() => handleUpdate({ goals, steps: "level" })}
      nextDisabled={!goals}
      isLoading={isLoading}
    >
      <div role="radiogroup" aria-label="Main goal" className="flex flex-col gap-3">
        {goalList.map(({ goal, title, description, imageUrl }) => (
          <OptionCard
            key={goal}
            selected={goal === goals}
            onClick={() => setGoals(goal)}
            className="flex h-28 items-center gap-4 overflow-hidden pr-12"
          >
            <div className="relative h-full w-28 shrink-0 bg-gradient-to-br from-zinc-800/80 to-zinc-900 sm:w-32">
              <Image
                src={imageUrl}
                alt=""
                fill
                sizes="128px"
                className="object-cover object-top"
              />
            </div>
            <div>
              <p className="text-lg font-semibold">{title}</p>
              <p className="mt-1 text-sm text-zinc-400">{description}</p>
            </div>
          </OptionCard>
        ))}
      </div>
    </StepLayout>
  );
};
export default Goals;
