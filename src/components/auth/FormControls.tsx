"use client";
import { cn } from "@/libs/utils";
import { Eye, EyeOff, Loader2, LucideIcon } from "lucide-react";
import React, {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useState,
} from "react";
import { FcGoogle } from "react-icons/fc";

// Note: globals.css sets `* { color: white }`, which also reaches the <path>
// elements inside icons, so lucide icons are coloured with stroke-* classes.

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

export const inputClassName =
  "h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15";

const invalidClassName =
  "border-red-500/70 focus:border-red-500 focus:ring-red-500/15";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  icon?: LucideIcon;
  error?: string;
  hint?: string;
  trailing?: ReactNode;
  labelAside?: ReactNode;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    { id, label, icon: Icon, error, hint, trailing, labelAside, className, ...props },
    ref
  ) => {
    const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

    return (
      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label htmlFor={id} className="block text-sm font-medium text-zinc-300">
            {label}
          </label>
          {labelAside}
        </div>
        <div className="relative">
          {Icon && (
            <Icon
              size={18}
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 stroke-zinc-500"
            />
          )}
          <input
            id={id}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={cn(
              inputClassName,
              { "pl-11": Icon, "pr-12": trailing, [invalidClassName]: error },
              className
            )}
            {...props}
          />
          {trailing && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              {trailing}
            </div>
          )}
        </div>
        {error ? (
          <p id={`${id}-error`} className="mt-2 text-sm text-primary">
            {error}
          </p>
        ) : hint ? (
          <p id={`${id}-hint`} className="mt-2 text-sm text-zinc-500">
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);
TextField.displayName = "TextField";

type PasswordFieldProps = Omit<TextFieldProps, "type" | "trailing">;

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (props, ref) => {
    const [visible, setVisible] = useState(false);
    const EyeIcon = visible ? EyeOff : Eye;

    return (
      <TextField
        ref={ref}
        {...props}
        type={visible ? "text" : "password"}
        trailing={
          <button
            type="button"
            onClick={() => setVisible((prev) => !prev)}
            aria-label={visible ? "Hide password" : "Show password"}
            className={cn(
              "group grid h-9 w-9 place-items-center rounded-lg transition hover:bg-zinc-800",
              focusRing
            )}
          >
            <EyeIcon
              size={18}
              className="stroke-zinc-400 group-hover:stroke-white"
            />
          </button>
        }
      />
    );
  }
);
PasswordField.displayName = "PasswordField";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  loadingText?: string;
};

export const PrimaryButton = ({
  isLoading,
  loadingText,
  children,
  className,
  disabled,
  type = "button",
  ...props
}: PrimaryButtonProps) => (
  <button
    type={type}
    disabled={disabled || isLoading}
    className={cn(
      "flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 font-semibold text-zinc-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-emerald-500",
      focusRing,
      className
    )}
    {...props}
  >
    {isLoading ? (
      <>
        <Loader2 size={18} className="animate-spin stroke-zinc-950" />
        {loadingText ?? children}
      </>
    ) : (
      children
    )}
  </button>
);

export const GoogleButton = ({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    type="button"
    className={cn(
      "flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-white font-medium text-zinc-900 transition hover:bg-zinc-200",
      focusRing,
      className
    )}
    {...props}
  >
    <FcGoogle className="text-xl" />
    {children}
  </button>
);

export const AuthDivider = ({ children }: { children: ReactNode }) => (
  <div className="my-6 flex items-center gap-3">
    <span className="h-px flex-1 bg-zinc-800" />
    <span className="text-xs uppercase tracking-wider text-zinc-500">
      {children}
    </span>
    <span className="h-px flex-1 bg-zinc-800" />
  </div>
);

export const AuthHeading = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <header className="mb-8 max-lg:text-center">
    <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
    <p className="mt-2 text-zinc-400">{description}</p>
  </header>
);

export const FullScreenLoader = ({ message }: { message: string }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 backdrop-blur-sm">
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 px-8 py-7">
      <Loader2 className="animate-spin stroke-emerald-400" size={28} />
      <p className="text-sm text-zinc-300">{message}</p>
    </div>
  </div>
);
