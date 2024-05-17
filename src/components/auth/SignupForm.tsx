"use client";
import { ChevronLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "react-query";
import {
  checkUser,
  signupUser,
  socialAuthentication,
  userProfile,
} from "@/api/user";
import { useRouter } from "next/navigation";
import { cn } from "@/libs/utils";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import useProfile from "@/hooks/useProfile";
import Image from "next/image";
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
} from "@/utils/localstorage";

type SignupFormProps = {};

const SignupForm: React.FC<SignupFormProps> = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [withEmail, setWithEmail] = useState("google"); //google, email, verify
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const { profile, refetch } = useProfile();
  const { data } = useSession();
  const { mutateAsync: socialAuth, isLoading: socialAuthLoading } = useMutation(
    {
      mutationFn: socialAuthentication,
    }
  );
  const { mutate: checkUserExist, isLoading: checkingForUser } = useMutation({
    mutationFn: checkUser,
    onSuccess: (response) => {
      if (data) {
        signupWithSocailAuth();
      }
    },
  });

  const signupWithSocailAuth = async () => {
    await socialAuth({
      name: data!.user!.name as string,
      username: `${(data!.user!.name as string).split(" ")?.[0]}${Math.floor(
        1000 * Math.random() * 9000
      ).toString()}`,
      email: data!.user!.email as string,
    })
      .then(async (data) => {
        setTokenToLocalStorage(data?.token);
        setIsSignup(true);
        await queryClient.prefetchQuery("profile", userProfile);
        // router.push("/onboarding");
      })
      .catch(() => {
        setIsSignup(false);
      })
      .finally(() => getTokenFromLocalStorage());
  };
  useEffect(() => {
    if (isSignup) {
      const refetchProfile = () => {
        setTimeout(() => {
          refetch();
        }, 2000);
      };

      refetchProfile();
    }
  }, [isSignup, router]);

  useEffect(() => {
    if (profile && profile.steps === "done") {
      router.replace("/");
    } else if (profile && profile.steps !== "done") {
      router.push("/configure-profile");
    } else if (data?.user) {
      checkUserExist({ value: { email: data?.user?.email } });
    }
  }, [checkUserExist, data, profile, router]);

  const validator = yup.object().shape({
    name: yup.string().required("Please fill your name"),
    email: yup
      .string()
      .email("Please provide a valid email address")
      .required("Please fill your email"),
    username: yup.string().required("Please fill your username"),
    password: yup
      .string()
      .min(6, "Password should be more than 6 characters")
      .required("Please fill your password"),
  });

  type signupTypeReference = yup.InferType<typeof validator>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupTypeReference>({
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
    resolver: yupResolver(validator),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: signupUser,
    onError: (value: any) => {
      toast.error(value.message);
    },
    onSuccess: (value: any) => {
      console.log(value);
      if (value.activationToken) {
        localStorage.setItem("token", value.activationToken);
        router.push("/signup/verify-account");
      }
    },
  });

  const handleSignup = (values: signupTypeReference) => {
    console.log(values);
    mutate({ value: values });
  };

  let content;
  switch (withEmail) {
    case "google":
      content = (
        <div className="flex flex-col gap-6 ">
          <div
            onClick={() => signIn("google")}
            className=" flex items-center justify-center sm:px-8 px-2 bg-neutral-200 hover:bg-white cursor-pointer  rounded-full py-3 sm:min-w-[350px] w-full text-lg font-medium gap-2 "
          >
            <FcGoogle />
            <span className="text-black ">Sign up with Google</span>
          </div>

          <div className="flex items-center justify-center gap-4 text-zinc-400">
            <div className="h-[2px] w-full bg-zinc-800" /> or{" "}
            <div className="h-[2px] w-full bg-zinc-800" />
          </div>

          <div
            className=" flex items-center justify-center px-8 border cursor-pointer border-zinc-700  rounded-full py-3 sm:min-w-[350px] w-full text-lg font-medium gap-2 "
            onClick={() => setWithEmail("email")}
          >
            Continue with email
          </div>

          <p className=" text-center">
            Already have an account?{" "}
            <Link href={"/login"} className=" text-blue-500 font-medium ">
              {" "}
              Sign In
            </Link>
          </p>
        </div>
      );
      break;
    case "email":
      content = (
        <form
          onSubmit={handleSubmit(handleSignup)}
          className="flex flex-col gap-3 relative my-6 "
        >
          <div className="flex flex-col gap-3">
            <label htmlFor="name" className=" text-lg">
              Name
            </label>
            <input
              {...register("name", { required: true })}
              placeholder="john doe"
              className={cn(
                "bg-transparent focus:outline-none border-[1px] p-3 border-zinc-400  focus:border-white rounded-lg h-[50px]",
                {
                  "border-red-500 focus:border-red-500": errors.name,
                }
              )}
            />
            {errors.name && (
              <p className=" text-red-500 -mt-2">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="name" className=" text-lg">
              Username
            </label>
            <input
              {...register("username", { required: true })}
              placeholder="johndoe"
              className={cn(
                "bg-transparent focus:outline-none border-[1px] p-3 border-zinc-400  focus:border-white rounded-lg h-[50px]",
                {
                  "border-red-500 focus:border-red-500": errors.username,
                }
              )}
            />
            {errors.username && (
              <p className=" text-red-500 -mt-2">{errors.username.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="name" className=" text-lg">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="me@gmail.com"
              className={cn(
                "bg-transparent focus:outline-none border-[1px] p-3 border-zinc-400  focus:border-white rounded-lg h-[50px]",
                {
                  "border-red-500 focus:border-red-500": errors.email,
                }
              )}
            />
            {errors.email && (
              <p className=" text-red-500 -mt-2">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-3 ">
            <label htmlFor="name" className=" text-lg">
              Password
            </label>
            <div className="relative w-full">
              <input
                {...register("password", { required: true })}
                placeholder="6+ characters"
                type={showPassword ? "text" : "password"}
                className={cn(
                  "bg-transparent w-full focus:outline-none border-[1px] p-3 border-zinc-400  focus:border-white rounded-lg h-[50px]",
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
                <p className=" text-red-500">{errors.password?.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className=" flex items-center justify-center mt-2 px-8 bg-neutral-200 hover:bg-white cursor-pointer text-black  rounded-full py-3 sm:min-w-[350px] w-full text-lg font-medium gap-2 "
          >
            {!isLoading ? (
              "Create Account"
            ) : (
              <>
                Signing up <Loader2 className=" animate-spin" color="black" />
              </>
            )}
          </button>
          <p className=" text-center">
            Already have an account?{" "}
            <Link href={"/login"} className=" text-blue-500 font-medium ">
              {" "}
              Sign In
            </Link>
          </p>

          <button
            onClick={() => setWithEmail("google")}
            className="text-zinc-400 hover:text-zinc-50 text-center"
          >
            Back
          </button>
        </form>
      );
      break;

    default:
      break;
  }

  return (
    <>
      {checkingForUser || socialAuthLoading ? (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm z-20">
          <div className=" bg-zinc-800/50 rounded-xl px-5 py-5 flex items-center justify-center flex-col gap-3">
            <div>
              <Loader2 className=" animate-spin" size={24} />
            </div>
          </div>
        </div>
      ) : null}

      <div className="w-full  sm:mt-0 ">
        <p className="sm:text-2xl text-xl font-bold md:mb-8 mb-4">Sign up</p>
        {content}
      </div>
    </>
  );
};
export default SignupForm;
