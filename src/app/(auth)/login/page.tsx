import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Log in · MaxUp",
};

const page = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default page;
