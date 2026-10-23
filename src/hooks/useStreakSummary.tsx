"use client";
import { allActivities } from "@/api/activity";
import {
  StreakStatus,
  getCurrentWeek,
  getStreakStatus,
  toDayKey,
} from "@/utils";
import { useMemo } from "react";
import { useQuery } from "react-query";
import useProfile from "./useProfile";
import useStreak from "./useStreak";

type Activity = { createdAt: string; totalTime: number };

const streakMessages: Record<StreakStatus, string> = {
  done: "You trained today. Streak secured.",
  pending: "Train today to keep your streak alive.",
  lost: "Finish a workout today to start a new streak.",
};

const useStreakSummary = () => {
  const { profile } = useProfile();
  const { streak, longestStreak, totalWorkout, isLoading } = useStreak({
    userId: profile?._id,
  });
  const { data, isLoading: activitiesLoading } = useQuery({
    queryFn: async () => await allActivities({ params: {} }),
    queryKey: "activity-days",
    refetchOnWindowFocus: false,
  });

  return useMemo(() => {
    // The server returns activities newest first.
    const activities: Activity[] = data?.activities ?? [];
    const activeDays = new Set(activities.map((a) => toDayKey(a.createdAt)));
    const status: StreakStatus = data
      ? getStreakStatus(activities[0]?.createdAt)
      : "pending";

    const week = getCurrentWeek().map((day) => ({
      ...day,
      isActive: activeDays.has(day.key),
    }));
    const weekStart = week[0].date;
    const thisWeek = activities.filter((a) => new Date(a.createdAt) >= weekStart);
    const currentStreak = status === "lost" ? 0 : streak ?? 0;

    return {
      streak: currentStreak,
      longestStreak: Math.max(longestStreak ?? 0, currentStreak),
      totalWorkout: totalWorkout ?? 0,
      status,
      message: currentStreak > 0 ? streakMessages[status] : streakMessages.lost,
      week,
      activeDaysThisWeek: week.filter((day) => day.isActive).length,
      workoutsThisWeek: thisWeek.length,
      minutesThisWeek: Math.round(
        thisWeek.reduce((total, a) => total + (a.totalTime ?? 0), 0) / 60
      ),
      isLoading: isLoading || activitiesLoading,
    };
  }, [data, streak, longestStreak, totalWorkout, isLoading, activitiesLoading]);
};

export type StreakSummary = ReturnType<typeof useStreakSummary>;
export default useStreakSummary;
