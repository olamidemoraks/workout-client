"use client";
import React from "react";
import MonthlyCalender from "./MonthlyCalender";
import RecentWorkoutChart from "./RecentWorkoutChart";
import RecentWorkouts from "./RecentWorkouts";
import ReportTotal from "./ReportTotal";

const Reports = () => {
  return (
    <>
      <div className="w-full flex lg:flex-row flex-col justify-center gap-4">
        <section className="p-4 pb-12 rounded-xl w-full min-w-0 border border-zinc-800 bg-zinc-950/40">
          <h2 className="text-lg font-semibold">Activity calendar</h2>
          <p className="text-sm text-zinc-400">
            Each square is a day. Brighter squares mean more workouts.
          </p>
          <MonthlyCalender />
        </section>
        <ReportTotal />
      </div>

      <div className=" gap-6 grid grid-cols-1 lg:grid-cols-2">
        <RecentWorkouts />
        <section className="flex flex-col h-full gap-4">
          <div>
            <h2 className="text-lg font-semibold">Focus areas</h2>
            <p className="text-sm text-zinc-400">
              Workouts completed for each muscle group
            </p>
          </div>
          <div className="flex items-center justify-center h-full w-full rounded-xl border border-zinc-800 bg-zinc-950/40">
            <RecentWorkoutChart />
          </div>
        </section>
      </div>
    </>
  );
};

export default Reports;
