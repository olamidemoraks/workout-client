import ProfileSetup from "@/components/auth/ProfileSetup";
import React from "react";

const Page = () => {
  return (
    <div className=" overflow-y-hidden h-[100vh]">
      <div className=" -z-10 flex flex-col items-center gap-2 -rotate-[30deg] absolute lg:right-10 right-1 lg:translate-x-[20%] translate-x-[70%] md:translate-y-[-50%] translate-y-[-100%]">
        <div className="relative">
          <div className="flex flex-col items-center gap-2">
            <div className="h-3 w-[300px] bg-zinc-400 rounded-full" />
            <div className="h-3 w-[350px] bg-emerald-500 rounded-full" />
            <div className="h-3 w-[280px] bg-white rounded-full" />
          </div>
          <div className="flex flex-col items-center gap-2 absolute top-[4px] right-[-6px] -z-10 opacity-40">
            <div className="h-3 w-[300px] bg-zinc-400 rounded-full" />
            <div className="h-3 w-[350px] bg-emerald-500 rounded-full" />
            <div className="h-3 w-[280px] bg-white rounded-full" />
          </div>
        </div>
      </div>

      <ProfileSetup />

      <div className=" -z-10 md:flex hidden flex-col items-center gap-2 -rotate-[30deg] absolute bottom-0 md:-left-60  translate-y-[-200%] ">
        <div className="relative">
          <div className="flex flex-col items-center gap-2">
            <div className="h-3 w-[300px] bg-zinc-400 rounded-full" />
            <div className="h-3 w-[350px] bg-emerald-500 rounded-full" />
            <div className="h-3 w-[280px] bg-white rounded-full" />
          </div>
          <div className="flex flex-col items-center gap-2 absolute top-[4px] right-[-6px] -z-10 opacity-40">
            <div className="h-3 w-[300px] bg-zinc-400 rounded-full" />
            <div className="h-3 w-[350px] bg-emerald-500 rounded-full" />
            <div className="h-3 w-[280px] bg-white rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
