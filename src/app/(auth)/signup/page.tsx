import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign up · MaxUp",
};

const Page = () => {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
};

export default Page;
