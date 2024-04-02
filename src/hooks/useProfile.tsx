"use client";
import { userProfile } from "@/api/user";
import React from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

const useProfile = () => {
  const { data, isLoading, refetch } = useQuery({
    queryFn: userProfile,
    queryKey: "profile",
    refetchOnWindowFocus: false,
    onError: (data: any) => {
      toast.error(String(data?.message));
    },
  });

  return {
    profile: data?.user as IUser,
    isLoading,
    refetch,
  };
};

export default useProfile;
