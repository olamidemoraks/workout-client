import { cn } from "@/libs/utils";
import React, { ChangeEvent, useState } from "react";
import { TextField, inputClassName } from "./FormControls";
import { StepLayout, UnitToggle } from "./OnboardingControls";

type WeightProps = {
  handleUpdate: (value: any) => void;
  isLoading: boolean;
  onBack?: () => void;
};

export const cmToFeetInches = (cm: number) => {
  const totalInches = cm / 2.54;
  let feet = Math.floor(totalInches / 12);
  let inches = Math.round(totalInches - feet * 12);
  if (inches === 12) {
    feet += 1;
    inches = 0;
  }
  return { feet, inches };
};

export const feetInchesToCm = (feet: number, inches: number) =>
  (feet * 12 + inches) * 2.54;

const unitSuffix = (unit: string) => (
  <span className="pointer-events-none pr-2 text-sm text-zinc-500">{unit}</span>
);

const Weight: React.FC<WeightProps> = ({ handleUpdate, isLoading, onBack }) => {
  const [isKG, setIsKG] = useState(true);
  const [isCM, setIsCM] = useState(true);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");

  const numericChange =
    (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
      if (isNaN(Number(e.target.value))) {
        return;
      }
      setter(e.target.value);
    };

  // 2.205 lb per kg
  const changeWeightUnit = (unit: "kg" | "lb") => {
    const toKG = unit === "kg";
    if (toKG === isKG) return;
    setWeight((prev) => {
      if (!prev) return prev;
      return toKG
        ? Math.floor(Number(prev) / 2.205).toFixed(0)
        : (Number(prev) * 2.205).toFixed(2);
    });
    setIsKG(toKG);
  };

  const changeHeightUnit = (unit: "cm" | "ft") => {
    const toCM = unit === "cm";
    if (toCM === isCM) return;
    if (toCM && (feet || inches)) {
      setHeight(
        Math.round(feetInchesToCm(Number(feet), Number(inches))).toString()
      );
    } else if (!toCM && height) {
      const converted = cmToFeetInches(Number(height));
      setFeet(String(converted.feet));
      setInches(String(converted.inches));
    }
    setIsCM(toCM);
  };

  const heightInCm = isCM
    ? Number(height)
    : feetInchesToCm(Number(feet), Number(inches));
  const canSubmit =
    Number(weight) > 0 && (isCM ? Number(height) > 0 : Number(feet) > 0);

  const heightToggle = (
    <UnitToggle
      label="Height unit"
      options={["cm", "ft"] as const}
      value={isCM ? "cm" : "ft"}
      onChange={changeHeightUnit}
    />
  );

  return (
    <StepLayout
      title="Your measurements"
      description="We use these to track your progress over time."
      onBack={onBack}
      onNext={() =>
        handleUpdate({
          weight: isKG ? weight : (Number(weight) / 2.205).toFixed(2),
          height: isCM ? height : heightInCm.toFixed(2),
          weightMeasure: isKG ? "kg" : "lb",
          heightMeasure: isCM ? "cm" : "ft",
          steps: "done",
        })
      }
      nextLabel="Finish setup"
      nextDisabled={!canSubmit}
      isLoading={isLoading}
    >
      <div className="flex flex-col gap-6">
        <TextField
          id="weight"
          label="Weight"
          inputMode="decimal"
          placeholder={isKG ? "e.g. 70" : "e.g. 154"}
          value={weight}
          onChange={numericChange(setWeight)}
          labelAside={
            <UnitToggle
              label="Weight unit"
              options={["kg", "lb"] as const}
              value={isKG ? "kg" : "lb"}
              onChange={changeWeightUnit}
            />
          }
          trailing={unitSuffix(isKG ? "kg" : "lb")}
        />

        {isCM ? (
          <TextField
            id="height"
            label="Height"
            inputMode="decimal"
            placeholder="e.g. 175"
            value={height}
            onChange={numericChange(setHeight)}
            labelAside={heightToggle}
            trailing={unitSuffix("cm")}
          />
        ) : (
          <div role="group" aria-labelledby="height-label">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span
                id="height-label"
                className="block text-sm font-medium text-zinc-300"
              >
                Height
              </span>
              {heightToggle}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  id: "height-feet",
                  label: "Feet",
                  unit: "ft",
                  placeholder: "e.g. 5",
                  value: feet,
                  setter: setFeet,
                },
                {
                  id: "height-inches",
                  label: "Inches",
                  unit: "in",
                  placeholder: "e.g. 9",
                  value: inches,
                  setter: setInches,
                },
              ].map(({ id, label, unit, placeholder, value, setter }) => (
                <div key={id} className="relative">
                  <input
                    id={id}
                    aria-label={label}
                    inputMode="numeric"
                    placeholder={placeholder}
                    value={value}
                    onChange={numericChange(setter)}
                    className={cn(inputClassName, "pr-12")}
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                    {unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </StepLayout>
  );
};
export default Weight;
