"use client";
import { allActivities } from "@/api/activity";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "react-query";

const useGetAllActivities = (): { data: any; isLoading: boolean } => {
  const searchParams = useSearchParams();
  const { data, isLoading, refetch } = useQuery({
    queryFn: async () => await allActivities({ params: searchParams }),
    queryKey: "all-activities",
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [searchParams]);
  return {
    data,
    isLoading,
  };
};

export default useGetAllActivities;
