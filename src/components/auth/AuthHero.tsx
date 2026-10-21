import { Flame, Timer, Trophy } from "lucide-react";
import Image from "next/image";
import React from "react";
import BrandMark from "./BrandMark";

const highlights = [
  { label: "Guided workouts", Icon: Timer },
  { label: "X-day challenges", Icon: Trophy },
  { label: "Daily streaks", Icon: Flame },
];

const AuthHero = () => {
  return (
    <aside className="sticky top-0 hidden h-screen flex-col justify-between overflow-hidden p-10 lg:flex xl:p-14">
      <Image
        src="/assets/welcome3.jpg"
        alt=""
        fill
        priority
        sizes="55vw"
        className="object-cover object-[center_25%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-zinc-950/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-zinc-950" />

      <BrandMark size={80} className="relative z-10" />

      <div className="relative z-10 max-w-md space-y-6">
        <h2 className="text-4xl xl:text-5xl font-bold leading-tight tracking-tight">
          Train smarter.
          <br />
          <span className="text-emerald-400">Show up daily.</span>
        </h2>
        <p className="text-lg text-zinc-300">
          Guided sessions, multi-day challenges and progress tracking that keep
          you moving.
        </p>

        <ul className="flex flex-wrap gap-2">
          {highlights.map(({ label, Icon }) => (
            <li
              key={label}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950/40 px-3 py-1.5 text-sm text-zinc-200 backdrop-blur-md"
            >
              <Icon size={15} className="stroke-emerald-400" />
              {label}
            </li>
          ))}
        </ul>

        <figure className="border-l-2 border-emerald-400 pl-4">
          <blockquote className="text-zinc-200 italic">
            &ldquo;Push harder than yesterday if you want a different
            tomorrow.&rdquo;
          </blockquote>
          <figcaption className="mt-1 text-sm text-zinc-400">
            Vincent Williams Sr.
          </figcaption>
        </figure>
      </div>
    </aside>
  );
};

export default AuthHero;
