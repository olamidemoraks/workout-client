"use client";
import { logout } from "@/api/user";
import { Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useMutation } from "react-query";

const Logout = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: logout,
  });

  useEffect(() => {
    mutate();
    signOut();
  }, [mutate]);
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="text-center space-y-2">
        <p className=" text-3xl flex gap-2">
          {isLoading && (
            <>
              {" "}
              Signing out <Loader2 className=" animate-spin" />
            </>
          )}
          {!isLoading && <>Signed Out</>}
        </p>
        <Link
          href={"/login"}
          className=" text-zinc-400 mt-3 hover:text-white underline "
        >
          {" "}
          click here to login
        </Link>
      </div>
    </div>
  );
};

export default Logout;
