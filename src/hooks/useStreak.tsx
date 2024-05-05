import { getStreak } from "@/api/user";
import React from "react";
import { useQuery } from "react-query";

type useStreakProps = {
  userId: string;
};

const useStreak = ({ userId }: useStreakProps) => {
  const { data, isLoading } = useQuery({
    queryFn: async () => await getStreak({ id: userId }),
    queryKey: "streak",
    enabled: !!userId,
    refetchOnWindowFocus: false,
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
