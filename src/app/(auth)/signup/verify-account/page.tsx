import AuthLayout from "@/components/auth/AuthLayout";
import VerifyPin from "@/components/auth/VerifyPin";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Verify your email · MaxUp",
};

const Page = () => {
  return (
    <AuthLayout>
      <VerifyPin />
    </AuthLayout>
  );
};

export default Page;
