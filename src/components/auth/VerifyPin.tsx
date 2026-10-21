"use client";
import { verifyCode } from "@/api/user";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { MailCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setTokenToLocalStorage } from "../../utils/localstorage";
import toast from "react-hot-toast";
import { AuthHeading, PrimaryButton, inputClassName } from "./FormControls";
import { cn } from "@/libs/utils";

const VerifyPin = () => {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const { mutate, isLoading } = useMutation({
    mutationFn: verifyCode,
    onError: (error: any) => {
      toast.error(error.message ?? "something went wrong!");
    },
    onSuccess: (data: { token: string }) => {
      localStorage.removeItem("token");
      setTokenToLocalStorage(data.token);
      router.push("/configure-profile");
    },
  });

  const handleSubmitCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const activationToken = localStorage.getItem("token");
    if (!activationToken) {
      toast.error("Your sign-up session has expired. Please sign up again.");
      return;
    }
    mutate({
      activation_code: pin,
      activation_token: activationToken,
    });
  };

  return (
    <>
      <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/30 max-lg:mx-auto">
        <MailCheck size={26} className="stroke-emerald-400" />
      </div>

      <AuthHeading
        title="Check your email"
        description="We've sent a verification code to your inbox. Enter it below to activate your account."
      />

      <form onSubmit={handleSubmitCode} className="flex flex-col gap-5">
        <div>
          <label
            htmlFor="verification-code"
            className="mb-2 block text-sm font-medium text-zinc-300"
          >
            Verification code
          </label>
          <input
            id="verification-code"
            value={pin}
            onChange={(e) => setPin(e.target.value.trim())}
            inputMode="numeric"
            autoComplete="one-time-code"
            autoFocus
            maxLength={6}
            placeholder="Enter code"
            aria-describedby="verification-code-hint"
            className={cn(
              inputClassName,
              "h-14 text-center font-mono text-2xl tracking-[0.5em] placeholder:font-sans placeholder:text-base placeholder:tracking-normal"
            )}
          />
          <p id="verification-code-hint" className="mt-2 text-sm text-zinc-500">
            Can&apos;t find it? Check your spam or promotions folder.
          </p>
        </div>

        <PrimaryButton
          type="submit"
          disabled={!pin}
          isLoading={isLoading}
          loadingText="Verifying…"
        >
          Verify account
        </PrimaryButton>
      </form>

      <p className="mt-8 text-center text-sm text-zinc-400">
        Used the wrong email?{" "}
        <Link
          href={"/signup"}
          className="font-semibold text-emerald-400 hover:text-emerald-300"
        >
          Sign up again
        </Link>
      </p>
    </>
  );
};

export default VerifyPin;
