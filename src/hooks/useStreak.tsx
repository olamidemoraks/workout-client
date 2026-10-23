import { getStreak } from "@/api/user";
import React from "react";
import { useQuery } from "react-query";

type useStreakProps = {
  userId: string;
};

// Streak data is shown in several places at once (navbar, its popover, the
// dashboard). Keep it fresh for a while so mounting another copy doesn't
// refetch it; ExerciseFinished invalidates it when a workout is saved.
export const STREAK_STALE_TIME = 5 * 60 * 1000;

const useStreak = ({ userId }: useStreakProps) => {
  const { data, isLoading } = useQuery({
    queryFn: async () => await getStreak({ id: userId }),
    queryKey: "streak",
    enabled: !!userId,
    refetchOnWindowFocus: false,
    staleTime: STREAK_STALE_TIME,
  });

  const streak = data?.streak as number;
  const longestStreak = data?.longestStreak as number;
  const totalWorkout = data?.totalWorkout as number;
  return {
    streak,
    totalWorkout,
    longestStreak,
    isLoading,
  };
};
export default useStreak;
