"use client";
import { AtSign, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import useProfile from "@/hooks/useProfile";
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
} from "@/utils/localstorage";
import {
  AuthDivider,
  AuthHeading,
  FullScreenLoader,
  GoogleButton,
  PasswordField,
  PrimaryButton,
  TextField,
} from "./FormControls";

type SignupFormProps = {};

const SignupForm: React.FC<SignupFormProps> = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
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
      .min(6, "Password must be at least 6 characters")
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
      if (value.activationToken) {
        localStorage.setItem("token", value.activationToken);
        router.push("/signup/verify-account");
      }
    },
  });

  const handleSignup = (values: signupTypeReference) => {
    mutate({ value: values });
  };

  return (
    <>
      {checkingForUser || socialAuthLoading ? (
        <FullScreenLoader message="Signing you up with Google…" />
      ) : null}

      <AuthHeading
        title="Create your account"
        description="Join MaxUp and start building a workout habit that sticks."
      />

      <GoogleButton onClick={() => signIn("google")}>
        Sign up with Google
      </GoogleButton>

      <AuthDivider>or sign up with email</AuthDivider>

      <form
        onSubmit={handleSubmit(handleSignup)}
        noValidate
        className="flex flex-col gap-5"
      >
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-3">
          <TextField
            id="name"
            label="Name"
            icon={User}
            autoComplete="name"
            placeholder="John Doe"
            error={errors.name?.message}
            {...register("name", { required: true })}
          />
          <TextField
            id="username"
            label="Username"
            icon={AtSign}
            autoComplete="username"
            placeholder="johndoe"
            error={errors.username?.message}
            {...register("username", { required: true })}
          />
        </div>
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
          autoComplete="new-password"
          placeholder="Create a password"
          hint="At least 6 characters"
          error={errors.password?.message}
          {...register("password", { required: true })}
        />

        <PrimaryButton
          type="submit"
          isLoading={isLoading}
          loadingText="Creating account…"
          className="mt-1"
        >
          Create account
        </PrimaryButton>
      </form>

      <p className="mt-8 text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <Link
          href={"/login"}
          className="font-semibold text-emerald-400 hover:text-emerald-300"
        >
          Log in
        </Link>
      </p>
    </>
  );
};
export default SignupForm;
