"use client";
import { verifyCode } from "@/api/user";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const VerifyPin = () => {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const { mutate, isLoading } = useMutation({
    mutationFn: verifyCode,
    onError: () => {},
    onSuccess: () => {
      localStorage.removeItem("token");
      router.push("/configure-profile");
      // navigate to profile setting up
    },
  });

  const handleSubmitCode = (e: any) => {
    e.preventDefault();
    if (
      typeof window === "undefined" &&
      localStorage.getItem("token") === null
    ) {
      return;
    }
    const data = {
      activation_code: pin,
      activation_token: localStorage.getItem("token") as string,
    };
    mutate({
      activation_code: data.activation_code,
      activation_token: data.activation_token,
    });
  };
  return (
    <div>
      {/* Security verification
    email verfifcattion code 
    enter the verification code sent to your mail */}
      <p className=" text-[1.6rem] font-bold mb-8">Security Verification</p>
      <form onSubmit={handleSubmitCode} className="flex flex-col gap-3">
        <label htmlFor="name" className=" text-lg">
          Email verification code
        </label>
        <input
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="bg-transparent focus:outline-none border-[3px] text-lg text-center p-3 border-zinc-400  focus:border-primary rounded-lg h-[50px]"
          maxLength={6}
        />
        <p className=" text-zinc-400 -mt-2">
          Enter the verification code sent to your mail
        </p>
        {/* {!pin && (
          <p className=" text-primary -mt-2">
            Please enter the verification code
          </p>
        )} */}
        <button
          disabled={!pin ? true : false}
          type="submit"
          className=" flex items-center justify-center px-8 disabled:bg-neutral-600 disabled:cursor-not-allowed bg-neutral-200 hover:bg-white cursor-pointer text-black  rounded-full py-3 min-w-[350px] text-lg font-medium gap-2 "
        >
          {isLoading ? (
            <span className="text-black">
              Verifying{" "}
              <Loader2
                className=" animate-spin ml-2 inline-block "
                color="black"
              />
            </span>
          ) : (
            "Verify Code"
          )}
        </button>
      </form>
    </div>
  );
};

export default VerifyPin;
