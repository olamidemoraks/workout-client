"use client";
import { cn } from "@/libs/utils";
import { ArrowLeft, Check } from "lucide-react";
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { PrimaryButton, focusRing } from "./FormControls";

type StepLayoutProps = {
  title: string;
  description?: string;
  children: ReactNode;
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  isLoading?: boolean;
};

export const StepLayout = ({
  title,
  description,
  children,
  onNext,
  onBack,
  nextLabel = "Continue",
  nextDisabled,
  isLoading,
}: StepLayoutProps) => (
  <div className="mx-auto flex w-full max-w-xl flex-1 flex-col">
    <div className="text-center">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
      {description && (
        <p className="mx-auto mt-2 max-w-md text-zinc-400">{description}</p>
      )}
    </div>

    <div className="mt-8 flex-1 sm:mt-10">{children}</div>

    <div className="sticky bottom-0 -mx-4 mt-8 flex gap-3 bg-gradient-to-t from-zinc-950 from-60% to-transparent px-4 pb-6 pt-8 sm:mx-0 sm:px-0">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className={cn(
            "group flex h-12 items-center gap-2 rounded-xl border border-zinc-800 px-5 font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-900 disabled:opacity-50",
            focusRing
          )}
        >
          <ArrowLeft
            size={18}
            className="stroke-zinc-400 group-hover:stroke-white"
          />
          Back
        </button>
      )}
      <PrimaryButton
        onClick={onNext}
        disabled={nextDisabled}
        isLoading={isLoading}
        loadingText="Saving…"
        className="flex-1"
      >
        {nextLabel}
      </PrimaryButton>
    </div>
  </div>
);

type OptionCardProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected: boolean;
};

export const OptionCard = ({
  selected,
  className,
  children,
  ...props
}: OptionCardProps) => (
  <button
    type="button"
    role="radio"
    aria-checked={selected}
    className={cn(
      "relative rounded-2xl border border-zinc-800 bg-zinc-900/50 text-left transition hover:border-zinc-600 hover:bg-zinc-900",
      focusRing,
      {
        "border-emerald-500 bg-emerald-500/[0.07] ring-1 ring-emerald-500 hover:border-emerald-500 hover:bg-emerald-500/[0.07]":
          selected,
      },
      className
    )}
    {...props}
  >
    {children}
    <span
      aria-hidden
      className={cn(
        "absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full border-2 border-zinc-700 transition",
        { "border-emerald-500 bg-emerald-500": selected }
      )}
    >
      {selected && (
        <Check size={14} strokeWidth={3} className="stroke-zinc-950" />
      )}
    </span>
  </button>
);

type UnitToggleProps<T extends string> = {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
};

export const UnitToggle = <T extends string>({
  label,
  options,
  value,
  onChange,
}: UnitToggleProps<T>) => (
  <div
    role="radiogroup"
    aria-label={label}
    className="inline-flex rounded-lg border border-zinc-800 bg-zinc-900 p-0.5"
  >
    {options.map((option) => (
      <button
        key={option}
        type="button"
        role="radio"
        aria-checked={value === option}
        onClick={() => onChange(option)}
        className={cn(
          "rounded-md px-2.5 py-1 text-xs font-semibold uppercase text-zinc-400 transition hover:text-white",
          focusRing,
          { "bg-emerald-500 text-zinc-950 hover:text-zinc-950": value === option }
        )}
      >
        {option}
      </button>
    ))}
  </div>
);
