"use client";
import {
  checkUser,
  loginUser,
  socialAuthentication,
  userProfile,
} from "@/api/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
} from "@/utils/localstorage";
import useProfile from "@/hooks/useProfile";
import {
  AuthDivider,
  AuthHeading,
  FullScreenLoader,
  GoogleButton,
  PasswordField,
  PrimaryButton,
  TextField,
} from "./FormControls";

const LoginForm = () => {
  const queryClient = useQueryClient();
  const [isSignIn, setIsSignIn] = useState(false);
  const router = useRouter();
  const { profile, refetch } = useProfile();
  const { data } = useSession();
  const { mutateAsync: socialAuth, isLoading: authLoading } = useMutation({
    mutationFn: socialAuthentication,
  });
  const { mutate: checkUserExist, isLoading: checkingForUser } = useMutation({
    mutationFn: checkUser,
    onSuccess: (response) => {
      if (data) {
        loginWithSocailAuth();
      }
    },
  });

  useEffect(() => {
    if (isSignIn) {
      const refetchProfile = () => {
        setTimeout(() => {
          refetch();
        }, 2000);
      };

      refetchProfile();
    }
  }, [isSignIn, router]);

  useEffect(() => {
    if (profile && profile.steps === "done") {
      router.replace("/");
    } else if (profile && profile.steps !== "done") {
      router.push("/configure-profile");
    } else if (data?.user) {
      checkUserExist({ value: { email: data?.user?.email } });
    }
  }, [profile, router, data, checkUserExist]);

  const loginWithSocailAuth = async () => {
    await socialAuth({
      name: data!.user!.name as string,
      username: `${(data!.user!.name as string).split(" ")?.[0]}${Math.floor(
        1000 * Math.random() * 9000
      ).toString()}`,
      email: data!.user!.email as string,
    })
      .then(async (data) => {
        setTokenToLocalStorage(data?.token);
        setIsSignIn(true);
        await queryClient.prefetchQuery("profile", userProfile);
        // router.push("/onboarding");
      })
      .catch(() => {
        setIsSignIn(false);
      })
      .finally(() => getTokenFromLocalStorage());
  };

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
      setIsSignIn(true);
    },
  });

  const handleSignup = (values: signupTypeReference) => {
    mutate({ value: values });
  };

  return (
    <>
      {checkingForUser || authLoading ? (
        <FullScreenLoader message="Signing you in with Google…" />
      ) : null}

      <AuthHeading
        title="Welcome back"
        description="Log in to pick up where you left off and keep your streak alive."
      />

      <GoogleButton onClick={() => signIn("google")}>
        Continue with Google
      </GoogleButton>

      <AuthDivider>or log in with email</AuthDivider>

      <form
        onSubmit={handleSubmit(handleSignup)}
        noValidate
        className="flex flex-col gap-5"
      >
        <TextField
          id="email"
          label="Email"
          type="email"
          icon={Mail}
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email", { required: true })}
        />
        <PasswordField
          id="password"
          label="Password"
          icon={Lock}
          autoComplete="current-password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register("password", { required: true })}
        />

        <PrimaryButton
          type="submit"
          isLoading={isLoading}
          loadingText="Logging in…"
          className="mt-1"
        >
          Log in
        </PrimaryButton>
      </form>

      <p className="mt-8 text-center text-sm text-zinc-400">
        Don&apos;t have an account?{" "}
        <Link
          href={"/signup"}
          className="font-semibold text-emerald-400 hover:text-emerald-300"
        >
          Sign up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
