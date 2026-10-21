import React, { ReactNode } from "react";
import AuthHero from "./AuthHero";
import BrandMark from "./BrandMark";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen w-full bg-zinc-950 lg:grid lg:grid-cols-[1.1fr,1fr]">
      <AuthHero />
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 sm:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-[-15%] h-[420px] w-[420px] rounded-full bg-emerald-500/10 blur-[120px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 left-[-20%] h-[360px] w-[360px] rounded-full bg-teal-500/5 blur-[120px] lg:hidden"
        />
        <div className="relative z-10 w-full max-w-[400px]">
          <BrandMark className="mx-auto mb-8 lg:hidden" />
          {children}
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
