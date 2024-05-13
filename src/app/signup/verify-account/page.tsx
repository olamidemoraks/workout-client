import SignupCarousal from "@/components/auth/SignupCarousal";
import VerifyPin from "@/components/auth/VerifyPin";
import React from "react";

const Page = () => {
  return (
    <div className=" w-full h-screen flex">
      <div className="w-[40%] h-screen max-md:hidden">
        <SignupCarousal />
      </div>
      <div className="w-full h-screen">
        <div className="flex items-center max-md:justify-center h-full  w-full px-3   md:px-[8rem]   ">
          <VerifyPin />
        </div>
      </div>
      {/* <div className="flex flex-col items-center gap-2 -rotate-[30deg] absolute lg:right-20 right-1 md:translate-x-0 translate-x-[70%] md:translate-y-[-50%] translate-y-[-100%]">
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
      </div> */}
    </div>
  );
};

export default Page;
