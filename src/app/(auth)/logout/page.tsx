"use client";
import { logout } from "@/api/user";
import BrandMark from "@/components/auth/BrandMark";
import { focusRing } from "@/components/auth/FormControls";
import { cn } from "@/libs/utils";
import { deleteTokenFromLocalStorage } from "@/utils/localstorage";
import { CheckCircle2, Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";

const Logout = () => {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      deleteTokenFromLocalStorage();
      queryClient.removeQueries();
    },
  });
  const signedOut = isSuccess || isError;

  useEffect(() => {
    mutate();
    signOut({ redirect: false });
  }, [mutate]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]"
      />
      <div className="relative z-10 flex w-full max-w-sm flex-col items-center text-center">
        <BrandMark className="mb-10" />
        <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/60 px-6 py-8">
          {signedOut ? (
            <>
              <CheckCircle2 size={36} className="mx-auto stroke-emerald-400" />
              <h1 className="mt-4 text-2xl font-bold">You&apos;re signed out</h1>
              <p className="mt-2 text-zinc-400">
                See you at your next workout.
              </p>
              <Link
                href={"/login"}
                className={cn(
                  "mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-emerald-500 font-semibold text-zinc-950 transition hover:bg-emerald-400",
                  focusRing
                )}
              >
                Log in again
              </Link>
            </>
          ) : (
            <>
              <Loader2
                size={36}
                className="mx-auto animate-spin stroke-emerald-400"
              />
              <h1 className="mt-4 text-2xl font-bold">Signing you out…</h1>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Logout;
