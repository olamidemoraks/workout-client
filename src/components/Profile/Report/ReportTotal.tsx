import useGetAllActivities from "@/hooks/useGetAllActivities";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import CustomLoader from "../../Common/CustomLoader";

const ReportTotal = () => {
  const { data, isLoading } = useGetAllActivities();
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

  if (isLoading) {
    return (
      <CustomLoader height="h-full" weight="lg:w-[500px] w-full" amount={1} />
    );
  }
  return (
    <div className=" rounded-md flex flex-col items-center justify-center  px-5 h-full   lg:w-[500px] w-full gap-5 lg:py-2 py-5 lg:mt-0 mt-8">
      <div className="flex   flex-row items-center justify-evenly px-5 gap-5">
        <div className="flex flex-col text-center">
          <p className=" text-3xl font-semibold text-green-400">
            {data?.activities?.length ?? 0}
          </p>
          <p className=" text-neutral-300">Workouts</p>
        </div>
        <div className="h-8 w-[1px] bg-zinc-800" />
        <div className="flex flex-col text-center">
          <p className=" text-3xl font-semibold text-green-400">
            {(totalMin / 60 ?? 0).toFixed(0)}
          </p>
          <p className=" text-neutral-300">Minutes</p>
        </div>
      </div>
    </div>
  );
};

export default ReportTotal;
