import useGetAllActivities from "@/hooks/useGetAllActivities";
import { toDayKey } from "@/utils";
import { CalendarCheck, Dumbbell, Gauge, Timer } from "lucide-react";
import React, { useMemo } from "react";
import CustomLoader from "../../Common/CustomLoader";
import Countup from "react-countup";

const ReportTotal = () => {
  const { data, isLoading } = useGetAllActivities();

  const stats = useMemo(() => {
    const activities: { totalTime: number; createdAt: string }[] =
      data?.activities ?? [];
    // totalTime is stored in seconds.
    const totalSeconds = activities.reduce(
      (total, activity) => total + (activity?.totalTime ?? 0),
      0
    );
    const workouts = activities.length;
    const activeDays = new Set(
      activities.map((activity) => toDayKey(activity.createdAt))
    ).size;

    return [
      { label: "Workouts", value: workouts, Icon: Dumbbell },
      { label: "Minutes", value: Math.ceil(totalSeconds / 60), Icon: Timer },
      { label: "Active days", value: activeDays, Icon: CalendarCheck },
      {
        label: "Avg. session",
        value: workouts ? Math.round(totalSeconds / 60 / workouts) : 0,
        suffix: " min",
        Icon: Gauge,
      },
    ];
  }, [data]);

  if (isLoading) {
    return (
      <CustomLoader height="h-[230px]" weight="lg:w-[420px] w-full shrink-0" amount={1} />
    );
  }
  return (
    <section
      aria-label="Workout totals"
      className="rounded-xl border border-zinc-800 bg-zinc-950/40 lg:w-[420px] w-full shrink-0 grid grid-cols-2 overflow-hidden"
    >
      {stats.map(({ label, value, suffix, Icon }, index) => (
        <div
          key={label}
          className={`flex flex-col items-center justify-center text-center gap-1 p-5 border-zinc-800 ${
            index % 2 === 0 ? "border-r" : ""
          } ${index < 2 ? "border-b" : ""}`}
        >
          <Icon size={18} aria-hidden className="stroke-zinc-500 mb-1" />
          <p className=" text-3xl font-semibold text-green-400 tabular-nums">
            {/* Countup renders its own <span>, which the global white text
                rule would otherwise colour. */}
            <Countup
              end={value}
              duration={2}
              suffix={suffix}
              className="text-green-400"
            />
          </p>
          <p className=" text-neutral-300 text-sm">{label}</p>
        </div>
      ))}
    </section>
  );
};

export default ReportTotal;
