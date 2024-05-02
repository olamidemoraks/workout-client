"use client";
import { checkUser, loginUser, socialAuthentication } from "@/api/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { cn } from "@/libs/utils";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { setTokenToLocalStorage } from "@/utils/localstorage";
import useProfile from "@/hooks/useProfile";

const LoginForm = () => {
  const router = useRouter();
  const { profile } = useProfile();
  const [showPassword, setShowPassword] = useState(false);
  const { data } = useSession();
  const { mutate: socialAuth, isLoading: authLoading } = useMutation({
    mutationFn: socialAuthentication,
    onSuccess: (data) => {
      setTokenToLocalStorage(data?.token);
    },
  });
  const { mutate: checkUserExist, isLoading: checkingForUser } = useMutation({
    mutationFn: checkUser,
    onSuccess: (response) => {
      if (data) {
        if (response.success) {
          socialAuth({
            name: data!.user!.name as string,
            username: (data!.user!.name as string).split(" ")?.[0],
            email: data!.user!.email as string,
          });

          router.push("/");
        } else if (!response.success) {
          socialAuth({
            name: data!.user!.name as string,
            username: (data!.user!.name as string).split(" ")?.[0],
            email: data!.user!.email as string,
          });
          router.push("/configure-profile");
        }
      }
    },
  });

  useEffect(() => {
    if (profile) {
      router.replace("/");
    } else if (data?.user) {
      checkUserExist({ value: { email: data?.user?.email } });
    }
  }, [checkUserExist, data, profile, router]);

  const validator = yup.object().shape({
    email: yup
      .string()
      .email("Please provide a valid email address")
      .required("Please fill your email"),
    password: yup.string().required("Please fill your password"),
  });

  type signupTypeReference = yup.InferType<typeof validator>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupTypeReference>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validator),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: loginUser,
    onError: (value: any) => {
      toast.error(value?.message);
    },
    onSuccess: (value: any) => {
      setTokenToLocalStorage(value?.token);
      router.push("/");
    },
  });

  const handleSignup = (values: signupTypeReference) => {
    mutate({ value: values });
  };
  return (
    <>
      {checkingForUser || authLoading ? (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm z-20">
          <div className=" bg-zinc-800/50 rounded-xl px-5 py-7 flex items-center justify-center flex-col gap-3">
            <div>
              <Loader2 className=" animate-spin" size={24} />
            </div>

            <p className=" text-lg font-semibold">loading account...</p>
          </div>
        </div>
      ) : null}
      <form
        onSubmit={handleSubmit(handleSignup)}
        className="flex flex-col gap-6 relative "
      >
        <p className=" text-[1.6rem] font-bold md:mb-8 mb-4">
          Login to <span className=" font-sans">MaxUp</span>
        </p>

        <div
          onClick={() => signIn("google")}
          className=" flex items-center justify-center  bg-neutral-200 hover:bg-white cursor-pointer text-black rounded-full py-3 sm:min-w-[350px] w-full text-lg font-medium gap-2 "
        >
          <FcGoogle className="text-xl" />
          Login with Google
        </div>

        <div className="flex items-center justify-center gap-4 text-zinc-400">
          <div className="h-[2px] w-full bg-zinc-800" /> or{" "}
          <div className="h-[2px] w-full bg-zinc-800" />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="name" className=" text-lg">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="your-email@gmail.com"
            className={cn(
              "bg-transparent focus:outline-none border-[2px] p-3 border-zinc-400  focus:border-white rounded-lg h-[50px]",
              {
                "border-red-500 focus:border-red-500": errors.email,
              }
            )}
          />
          {errors.email && (
            <p className=" text-primary -mt-2">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-3 ">
          <label htmlFor="password" className=" text-lg">
            Password
          </label>
          <div className="relative w-full">
            <input
              {...register("password", { required: true })}
              placeholder="--------"
              type={showPassword ? "text" : "password"}
              className={cn(
                "bg-transparent w-full focus:outline-none border-[2px] p-3 border-zinc-400  focus:border-white rounded-lg h-[50px]",
                {
                  "border-red-500 focus:border-red-500": errors.password,
                }
              )}
            />
            <div
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </div>
            {errors.password && (
              <p className=" text-primary">{errors.password?.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className=" flex items-center justify-center px-8 bg-neutral-200 hover:bg-white cursor-pointer text-black  rounded-full py-3 sm:min-w-[350px] w-full text-lg font-medium gap-2 "
        >
          {!isLoading ? (
            "Login"
          ) : (
            <>
              Loading.. <Loader2 className=" animate-spin" color="black" />
            </>
          )}
        </button>
        <p className=" text-center">
          I don&apos;t have an account?{" "}
          <Link href={"/signup"} className=" text-blue-500 font-medium ">
            {" "}
            Sign Up
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
