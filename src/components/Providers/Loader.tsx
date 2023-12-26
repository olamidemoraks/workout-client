"use client";
import useProfile from "@/hooks/useProfile";
import { Loader2 } from "lucide-react";
import React, { PropsWithChildren } from "react";

const Loader = ({ children }: PropsWithChildren) => {
  const { isLoading } = useProfile();
  return (
    <>
      {
        // isLoading ? (
        //   <div className="w-full h-screen flex justify-center items-center">
        //     <Loader2 className=" text-3xl text-white animate-spin" />
        //   </div>
        // ) : (
        children
      }
    </>
  );
};

export default Loader;
