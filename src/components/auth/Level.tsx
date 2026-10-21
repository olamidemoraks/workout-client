import { cn } from "@/libs/utils";
import React, { useState } from "react";
import { OptionCard, StepLayout } from "./OnboardingControls";

type LevelProps = {
  handleUpdate: (value: any) => void;
  isLoading: boolean;
  levelValue?: number;
  onBack?: () => void;
};

const levels = [
  {
    name: "Beginner",
    value: 1,
    description: "New to training or just getting back into it",
  },
  {
    name: "Intermediate",
    value: 2,
    description: "You work out a few times a week",
  },
  { name: "Advanced", value: 3, description: "You train hard and often" },
];

const barHeights = ["h-3", "h-5", "h-7"];

const Level: React.FC<LevelProps> = ({
  handleUpdate,
  isLoading,
  levelValue,
  onBack,
}) => {
  const [level, setLevel] = useState<number | undefined>(levelValue);
  return (
    <StepLayout
      title="What's your fitness level?"
      description="Choose the level that best describes you today."
      onBack={onBack}
      onNext={() => handleUpdate({ level, steps: "weight" })}
      nextDisabled={!level}
      isLoading={isLoading}
    >
      <div
        role="radiogroup"
        aria-label="Fitness level"
        className="grid gap-3 sm:grid-cols-3"
      >
        {levels.map(({ name, value, description }) => {
          const selected = value === level;
          return (
            <OptionCard
              key={value}
              selected={selected}
              onClick={() => setLevel(value)}
              className="flex items-center gap-5 p-5 pr-12 sm:min-h-[200px] sm:flex-col sm:items-start sm:pr-5"
            >
              <div aria-hidden className="flex h-7 w-8 shrink-0 items-end gap-1">
                {barHeights.map((height, index) => (
                  <span
                    key={height}
                    className={cn("w-2 rounded-sm transition-colors", height, {
                      "bg-zinc-700": index >= value,
                      "bg-zinc-300": index < value && !selected,
                      "bg-emerald-400": index < value && selected,
                    })}
                  />
                ))}
              </div>
              <div className="sm:mt-auto">
                <p className="text-lg font-semibold">{name}</p>
                <p className="mt-1 text-sm text-zinc-400">{description}</p>
              </div>
            </OptionCard>
          );
        })}
      </div>
    </StepLayout>
  );
};
export default Level;
