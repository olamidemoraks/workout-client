import SignupCarousal from "@/components/auth/SignupCarousal";
import SignupForm from "@/components/auth/SignupForm";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className=" w-full min-h-screen flex overflow-x-hidden overflow-y-auto">
      <div className="w-[40%] h-screen max-md:hidden">
        <SignupCarousal />
      </div>
      <div className="w-full min-h-screen">
        <div className="flex flex-col items-center justify-center h-full sm:w-[600px] w-full  md:px-[8rem] px-[2rem]   ">
          <div className=" flex flex-col items-center justify-center py-3 group">
            <Image
              src={"/assets/logo3.svg"}
              alt="logo"
              priority
              height={100}
              width={100}
            />

            <p className=" text-lg font-bold group-hover:tracking-[.25rem] transition-all ease-in-out duration-200 tracking-[.2rem] -mt-2">
              Ma<span className=" text-[28px]">x</span>up
            </p>
          </div>
          <SignupForm />
        </div>
      </div>
      {/* <div className="flex flex-col items-center gap-2 -rotate-[30deg] absolute lg:right-20 md:right-10 right-1  md:translate-x-[30%] translate-x-[80%] md:translate-y-[-30%] translate-y-[-100%]">
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
