import useRecentWorkout from "@/hooks/useRecentWorkout";
import { getDaysOfWeekWithDates } from "@/utils";
import { Check, ChevronDown } from "lucide-react";
import React, { useMemo } from "react";
import StreakDays from "../Common/StreakDays";

const DailyAttendance = ({ external }: { external?: boolean }) => {
  const { data, isLoading } = useRecentWorkout();
  const weekDates = useMemo(() => {
    return getDaysOfWeekWithDates();
  }, []);

  const activities = data?.activities.map((activity: any) =>
    (new Date(activity?.createdAt) as Date).toLocaleDateString()
  ) as string[];

  return (
    <div className="  sm:w-fit w-full rounded">
      {external ? null : (
        <p className="mb-4 uppercase text-lg">Activity Tracking</p>
      )}
      <StreakDays activities={activities} />
    </div>
  );
};

export default DailyAttendance;
