"use client";
import React from "react";
import MonthlyCalender from "./MonthlyCalender";
import RecentWorkoutChart from "./RecentWorkoutChart";
import RecentWorkouts from "./RecentWorkouts";
import ReportTotal from "./ReportTotal";

const Reports = () => {
  return (
    <div className="flex flex-col gap-12 px-10 mb-10 ">
      <div className="w-full flex lg:flex-row flex-col items-center gap-5">
        <div className="p-3 pb-20 rounded-md bg-zinc-900/30 w-full">
          <MonthlyCalender />
        </div>
        <ReportTotal />
      </div>

      <div className=" gap-6 grid grid-cols-1 md:grid-cols-2">
        <RecentWorkouts />
        <div className="flex items-center justify-center   w-full bg-zinc-900/30 rounded-md mt-6">
          <RecentWorkoutChart />
        </div>
      </div>
    </div>
  );
};

export default Reports;
