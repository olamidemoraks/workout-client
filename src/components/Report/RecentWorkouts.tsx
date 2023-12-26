import useRecentWorkout from "@/hooks/useRecentWorkout";
import React, { useMemo } from "react";
import { format } from "timeago.js";

const RecentWorkouts = () => {
  const { data, isLoading } = useRecentWorkout();

  const recentWorkoutActivities: any[] = useMemo(() => {
    return data?.activities?.slice(0, 5);
  }, [data]);

  return (
    <div className=" flex flex-col gap-4  w-full">
      <p className=" uppercase font-semibold">Workout Activity</p>
      {recentWorkoutActivities?.map((activity) => (
        <div
          key={activity}
          className="flex items-start justify-between w-full bg-zinc-900/30 p-3 px-6 rounded"
        >
          <div>
            <p className=" font-semibold capitalize">{activity?.workoutName}</p>
            <p className=" text-neutral-300">
              {(activity?.totalTime / 60).toFixed(0)} min
            </p>
          </div>
          <p className=" text-sm text-neutral-400">
            {format(activity?.createdAt)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RecentWorkouts;
