"use client";
import { logout } from "@/api/user";
import { Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useMutation } from "react-query";

const Logout = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      signOut();
      redirect("/login");
    },
  });

  useEffect(() => {
    mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="text-center space-y-2">
        <p className=" text-3xl">
          Signing out {isLoading && <Loader2 className=" animate-spin" />}
        </p>
        <Link href={"/login"} className=" text-blue-500 underline">
          {" "}
          click here to login
        </Link>
      </div>
    </div>
  );
};

export default Logout;
