import LoginForm from "@/components/auth/LoginForm";
import SignupCarousal from "@/components/auth/SignupCarousal";
import React from "react";

const page = () => {
  return (
    <div className=" w-full h-screen flex relative overflow-hidden">
      <div className="w-[40%] h-screen max-md:hidden">
        <SignupCarousal />
      </div>
      <div className="w-full h-screen">
        <div className="flex items-center max-md:justify-center h-full sm:w-[600px] w-[100%]  md:px-[8rem] px-[2rem]   ">
          <LoginForm />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 -rotate-[30deg] absolute lg:right-20 md:right-10 right-1 lg:translate-x-0 md:translate-x-[30%]  translate-x-[80%] md:translate-y-[-50%] translate-y-[-100%]">
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

export default page;
