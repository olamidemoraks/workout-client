"use client";
import { recentRctivity } from "@/api/activity";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "react-query";

const useRecentWorkout = (): { data: any; isLoading: boolean } => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  console.log({ pathname });
  const { data, isLoading, refetch } = useQuery({
    queryFn: async () => await recentRctivity({ params: searchParams }),
    queryKey: "recent-activity",
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (pathname === "/profile") {
      refetch();
    }
  }, [searchParams]);
  return {
    data,
    isLoading,
  };
};

export default useRecentWorkout;
