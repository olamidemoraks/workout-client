import React, { useMemo } from "react";
import useRecentWorkout from "./useRecentWorkout";

const useBatteryCharge = () => {
  const { data, isLoading } = useRecentWorkout();
  const chargeLeft: number = useMemo(() => {
    const todayDate = new Date();
    const charge = 4;
    const allActivityForToday: any[] = data?.activities?.filter(
      (activity: any) => {
        const activityDate = new Date(activity?.createdAt);
        if (
          activityDate.toLocaleDateString() === todayDate.toLocaleDateString()
        ) {
          return activity;
        }
      }
    );
    let remainingCharge = charge - (allActivityForToday?.length ?? 4);

    return remainingCharge;
  }, [data]);
  return {
    chargeLeft,
  };
};

export default useBatteryCharge;
