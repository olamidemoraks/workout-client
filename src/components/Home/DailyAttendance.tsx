import useRecentWorkout from "@/hooks/useRecentWorkout";
import { getDaysOfWeekWithDates } from "@/utils";
import { Check, ChevronDown } from "lucide-react";
import React, { useMemo } from "react";

const DailyAttendance = () => {
  const { data, isLoading } = useRecentWorkout();
  const weekDates = useMemo(() => {
    return getDaysOfWeekWithDates();
  }, []);

  const activities = data?.activities.map((activity: any) =>
    (new Date(activity?.createdAt) as Date).toLocaleDateString()
  ) as string[];

  return (
    <div className="  sm:w-fit w-full rounded">
      <p className="mb-3">Weekly Goals</p>
      <div className="flex justify-between">
        {weekDates.map(({ name, date }) => (
          <div key={name} className="flex flex-col gap-2 items-center">
            <div className="hexagon-container sm:h-[35px] sm:w-[35px] h-[30px] w-[30px]">
              <div
                className={`hexagon flex items-center justify-center ${
                  activities?.includes(date)
                    ? "bg-gradient-to-tl from-indigo-600 to-indigo-400 "
                    : " bg-zinc-700"
                }`}
              >
                {activities?.includes(date) ? (
                  <Check className=" text-sm " />
                ) : null}
              </div>
            </div>
            <p className=" text-xs text-zinc-400">{name.substring(0, 3)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyAttendance;
