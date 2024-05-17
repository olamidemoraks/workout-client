"use client";
import { userProfile } from "@/api/user";
import { getTokenFromLocalStorage } from "@/utils/localstorage";
import { useQuery } from "react-query";

const useProfile = () => {
  const { data, isLoading, refetch } = useQuery({
    queryFn: userProfile,
    queryKey: "profile",
    refetchOnWindowFocus: false,
  });

  return {
    profile: data?.user as IUser,
    isLoading,
    refetch,
  };
};

export default useProfile;
