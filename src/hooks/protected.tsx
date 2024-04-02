"use client";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import useProfile from "./useProfile";
import { Loader2 } from "lucide-react";

const Protected = ({ children }: PropsWithChildren) => {
  const { profile, isLoading } = useProfile();
  return (
    <>
      {/* {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Loader2 className=" text-3xl text-white animate-spin" />
        </div>
      ) : (
        <>{profile ? children : redirect("/login")}</>
      )} */}
      {children}
    </>
  );
};

export default Protected;
