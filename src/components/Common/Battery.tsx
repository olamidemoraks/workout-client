import useRecentWorkout from "@/hooks/useRecentWorkout";
import React, { useMemo } from "react";
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
    4: "bg-green-600/80",
    0: "",
  };

  return (
    <div className="flex flex-col items-center relative">
      {/* <FaBolt className=" fill-yellow-300 opacity-70" /> */}
      <div className="h-1 w-2 bg-zinc-400 "></div>

      <div className="rounded-[1px] w-4 h-6 border border-zinc-400 flex flex-col-reverse gap-[2px]  p-[1px]">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div
              className={`w-full h-full ${
                chargeLeft > i
                  ? `${chargeColor[chargeLeft]}`
                  : " bg-transparent"
              } `}
              key={i}
            />
          ))}
      </div>
    </div>
  );
};
export default Battery;
