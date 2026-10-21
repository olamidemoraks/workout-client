import { cn } from "@/libs/utils";
import { ChevronDown } from "lucide-react";
import moment from "moment";
import React, { ReactNode, useState } from "react";
import toast from "react-hot-toast";
import { inputClassName } from "./FormControls";
import { StepLayout } from "./OnboardingControls";

type AgeProps = {
  handleUpdate: (value: any) => void;
  isLoading: boolean;
  ageValue?: Date | string;
  onBack?: () => void;
};

const MIN_AGE = 15;
const MONTHS = moment.months();
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 100 }, (_, index) => currentYear - index);

// A leap year, so 29 February is selectable before a year is chosen.
const daysInMonth = (month: string, year: string) =>
  moment({ year: year ? Number(year) : 2000, month: Number(month) }).daysInMonth();

const savedBirthDate = (ageValue?: Date | string) => {
  if (!ageValue) return null;
  const date = new Date(ageValue);
  if (isNaN(date.getTime()) || moment().diff(date, "year") < MIN_AGE) {
    return null;
  }
  return date;
};

const Age: React.FC<AgeProps> = ({
  handleUpdate,
  isLoading,
  ageValue,
  onBack,
}) => {
  const [initialDate] = useState(() => savedBirthDate(ageValue));
  const [day, setDay] = useState(initialDate ? String(initialDate.getDate()) : "");
  const [month, setMonth] = useState(
    initialDate ? String(initialDate.getMonth()) : ""
  );
  const [year, setYear] = useState(
    initialDate ? String(initialDate.getFullYear()) : ""
  );

  const birthDate =
    day && month && year
      ? new Date(Number(year), Number(month), Number(day))
      : null;
  const age = birthDate ? moment().diff(birthDate, "year") : null;
  const tooYoung = age !== null && age < MIN_AGE;
  const maxDay = month ? daysInMonth(month, year) : 31;

  const keepDayInMonth = (nextMonth: string, nextYear: string) => {
    if (!day || !nextMonth) return;
    const max = daysInMonth(nextMonth, nextYear);
    if (Number(day) > max) setDay(String(max));
  };

  const handleNext = () => {
    if (!birthDate) return;
    if (tooYoung) {
      toast.error("You are below the required age.");
      return;
    }
    handleUpdate({ age: birthDate, steps: "goal" });
  };

  return (
    <StepLayout
      title="When were you born?"
      description="Your age helps us tailor your training."
      onBack={onBack}
      onNext={handleNext}
      nextDisabled={!birthDate || tooYoung}
      isLoading={isLoading}
    >
      <div className="grid grid-cols-[1fr,1.6fr,1.2fr] gap-3">
        <SelectField id="birth-day" label="Day" value={day} onChange={setDay}>
          <option value="" disabled>
            Day
          </option>
          {Array.from({ length: maxDay }, (_, index) => (
            <option key={index + 1} value={index + 1} className="bg-zinc-900">
              {index + 1}
            </option>
          ))}
        </SelectField>
        <SelectField
          id="birth-month"
          label="Month"
          value={month}
          onChange={(value) => {
            setMonth(value);
            keepDayInMonth(value, year);
          }}
        >
          <option value="" disabled>
            Month
          </option>
          {MONTHS.map((name, index) => (
            <option key={name} value={index} className="bg-zinc-900">
              {name}
            </option>
          ))}
        </SelectField>
        <SelectField
          id="birth-year"
          label="Year"
          value={year}
          onChange={(value) => {
            setYear(value);
            keepDayInMonth(month, value);
          }}
        >
          <option value="" disabled>
            Year
          </option>
          {YEARS.map((value) => (
            <option key={value} value={value} className="bg-zinc-900">
              {value}
            </option>
          ))}
        </SelectField>
      </div>

      <div
        aria-live="polite"
        className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 px-5 py-6 text-center"
      >
        {age === null ? (
          <p className="text-zinc-500">Select your full date of birth</p>
        ) : tooYoung ? (
          <p className="text-primary">
            You need to be at least {MIN_AGE} to use MaxUp.
          </p>
        ) : (
          <>
            <p className="text-4xl font-bold text-emerald-400">{age}</p>
            <p className="mt-1 text-sm text-zinc-400">years old</p>
          </>
        )}
      </div>
    </StepLayout>
  );
};

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
};

const SelectField = ({ id, label, value, onChange, children }: SelectFieldProps) => (
  <div>
    <label htmlFor={id} className="mb-2 block text-sm font-medium text-zinc-300">
      {label}
    </label>
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(inputClassName, "appearance-none pr-9 [color-scheme:dark]", {
          "text-zinc-500": !value,
        })}
      >
        {children}
      </select>
      <ChevronDown
        size={16}
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 stroke-zinc-500"
      />
    </div>
  </div>
);

export default Age;
