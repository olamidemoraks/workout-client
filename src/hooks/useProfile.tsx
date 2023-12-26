"use client";
import { userProfile } from "@/api/user";
import React from "react";
import { useQuery } from "react-query";

const useProfile = () => {
  const { data, isLoading } = useQuery({
    queryFn: userProfile,
    queryKey: "profile",
    refetchOnWindowFocus: false,
  });
  return {
    profile: data?.user as IUser,
    isLoading,
  };
};

export default useProfile;
