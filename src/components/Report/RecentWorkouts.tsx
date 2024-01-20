import useRecentWorkout from "@/hooks/useRecentWorkout";
import { alphabetsColor } from "@/utils/data";
import { Dot } from "lucide-react";
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
          className="flex items-center justify-between w-full bg-zinc-900 p-3 px-6 rounded"
        >
          <div>
            <div className=" font-semibold capitalize flex items-center">
              Last workout <Dot />
              {activity?.workoutName}
            </div>
            <div className="flex items-center text-sm text-neutral-400">
              <p className="text-neutral-400">
                {new Date(activity?.createdAt).toLocaleString("default", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
              <Dot className="fill-neutral-400" color="#a3a3a3" />
              <p className="text-neutral-400">
                {(activity?.totalTime / 60).toFixed(0) +
                  ":" +
                  (activity?.totalTime % 60)}{" "}
                min
              </p>
            </div>
          </div>
          <div>
            <p
              className={` capitalize text-neutral-300 px-2 rounded-xl text-sm ${
                alphabetsColor[
                  (activity?.workoutType as string)
                    ?.toUpperCase()
                    .substring(0, 1)
                ]
              }`}
            >
              {activity?.workoutType}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentWorkouts;
