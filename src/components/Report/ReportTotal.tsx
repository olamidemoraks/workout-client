import useRecentWorkout from "@/hooks/useRecentWorkout";
import React, { useMemo } from "react";

const ReportTotal = () => {
  const { data, isLoading } = useRecentWorkout();
  const totalMin = useMemo(() => {
    return data?.activities?.reduce(
      (accumalator: number, currentValue: { totalTime: any }) => {
        const totalTime = currentValue.totalTime;
        accumalator += totalTime;
        return accumalator;
      },
      0
    );
  }, [data]);
  return (
    <div className="flex flex-col items-center justify-evenly py-2 px-5 lg:bg-transparent bg-zinc-900/30 lg:w-[500px] w-full gap-5 lg:mt-0 mt-8">
      <p className=" text-lg font-semibold lg:text-center text-left">Reports</p>
      <div className="flex   flex-row items-center justify-evenly px-5 gap-5">
        <div className="flex flex-col text-center">
          <p className=" text-4xl font-semibold text-green-400">
            {data?.activities?.length ?? 0}
          </p>
          <p className=" text-neutral-400">Workouts</p>
        </div>
        <div className="h-8 w-[1px] bg-zinc-800" />
        <div className="flex flex-col text-center">
          <p className=" text-4xl font-semibold text-green-400">
            {(totalMin / 60).toFixed(0) ?? 0}
          </p>
          <p className=" text-neutral-400">Minutes</p>
        </div>
      </div>
    </div>
  );
};

export default ReportTotal;
