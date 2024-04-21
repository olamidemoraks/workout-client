import useRecentWorkout from "@/hooks/useRecentWorkout";
import React, { useMemo } from "react";
import { BiSolidZap } from "react-icons/bi";
import { FaBolt } from "react-icons/fa";

const Battery = () => {
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

  const chargeColor: { [key: number]: string } = {
    1: "bg-red-600/60",
    2: "bg-orange-600/60",
    3: "bg-blue-600/60",
    4: "bg-blue-500/80",
    0: "",
  };

  return (
    <div className="rounded-full w-fit h-fit  bg-zinc-900 items-center  flex flex-row gap-[2px]  p-[3px]">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div
            className={`w-3 rounded-full h-3 ${
              chargeLeft > i ? `${chargeColor[chargeLeft]}` : " bg-transparent"
            } `}
            key={i}
          />
        ))}
      <BiSolidZap className="ml-1" size={15} />
    </div>
  );
};
export default Battery;
