"use client";
import React from "react";
import MonthlyCalender from "./MonthlyCalender";
import RecentWorkoutChart from "./RecentWorkoutChart";
import RecentWorkouts from "./RecentWorkouts";
import ReportTotal from "./ReportTotal";

const Reports = () => {
  return (
    <>
      <div className="w-full  flex lg:flex-row flex-col items-center gap-2">
        <div className="p-3 pb-12 rounded-md w-full">
          <MonthlyCalender />
        </div>
        <ReportTotal />
      </div>

      <div className=" gap-6 grid grid-cols-1 md:grid-cols-2">
        <RecentWorkouts />
        <div className="flex flex-col h-full  ">
          <p className=" uppercase font-semibold mb-4">Activity</p>
          <div className="flex items-center justify-center  h-full w-full  rounded-md ">
            <RecentWorkoutChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
