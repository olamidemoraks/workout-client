"use client";
import { checkUser, socialAuthentication } from "@/api/user";
import useProfile from "@/hooks/useProfile";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, redirect } from "next/navigation";
import React, { PropsWithChildren, useEffect } from "react";
import { useMutation } from "react-query";

const Loader = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { isLoading, profile } = useProfile();

  return (
    <>
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Loader2 className=" text-3xl text-white animate-spin" />
        </div>
      ) : (
        { children }
      )}
    </>
  );
};

export default Loader;
