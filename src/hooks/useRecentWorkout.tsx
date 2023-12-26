"use client";
import { recentRctivity } from "@/api/activity";
import React from "react";
import { useQuery } from "react-query";

const useRecentWorkout = (): { data: any; isLoading: boolean } => {
  const { data, isLoading } = useQuery({
    queryFn: recentRctivity,
    refetchOnWindowFocus: false,
  });
  return {
    data,
    isLoading,
  };
};

export default useRecentWorkout;
