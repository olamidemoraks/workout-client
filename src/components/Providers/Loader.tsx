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
  // const { data } = useSession();
  // const { mutate: socialAuth, isLoading: authLoading } = useMutation({
  //   mutationFn: socialAuthentication,
  // });
  // const { mutate: checkUserExist, isLoading: checkingForUser } = useMutation({
  //   mutationFn: checkUser,
  //   onSuccess: (response) => {
  //     if (data) {
  //       if (response.success) {
  //         socialAuth({
  //           name: data!.user!.name as string,
  //           username: (data!.user!.name as string).split(" ")?.[0],
  //           email: data!.user!.email as string,
  //         });
  //       } else if (!response.success) {
  //         router.push("/login");
  //       }
  //     }
  //   },
  // });

  // useEffect(() => {
  //   if (data?.user) {
  //     checkUserExist({ value: { email: data?.user?.email } });
  //   }
  // }, [checkUserExist, data]);
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
