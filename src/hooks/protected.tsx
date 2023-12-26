"use client";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import useProfile from "./useProfile";

const Protected = ({ children }: PropsWithChildren) => {
  const { profile } = useProfile();
  return profile ? children : redirect("/login");
};

export default Protected;
