"use client";
import { recentRctivity } from "@/api/activity";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "react-query";

const useRecentWorkout = (): { data: any; isLoading: boolean } => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  console.log({ pathname });
  // Keyed by the viewed user so another profile's activity never replaces
  // yours (the dashboard and workout battery read this too).
  const viewedUserId = searchParams?.get("id") ?? "me";
  const { data, isLoading, refetch } = useQuery({
    queryFn: async () => await recentRctivity({ params: searchParams }),
    queryKey: ["recent-activity", viewedUserId],
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
