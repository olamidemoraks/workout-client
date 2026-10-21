import ProfileSetup from "@/components/auth/ProfileSetup";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Set up your profile · MaxUp",
};

const Page = () => {
  return <ProfileSetup />;
};

export default Page;
