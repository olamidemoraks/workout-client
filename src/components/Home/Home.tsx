"use client";
import React from "react";
import { CalendarCheck, Dumbbell, Timer } from "lucide-react";
import HomeChallenge from "../Challenges/HomeChallenge";
import FeatureCategories from "../Workout/FeatureCategories";
import HomeSection from "./HomeSection";
import HomePersonalizeWorkouts from "../PersonalizeWorkout/HomePersonalizeWorkouts";
import DailyAttendance from "./DailyAttendance";
import RecentWorkouts from "../Profile/Report/RecentWorkouts";
import TodayCard from "./TodayCard";
import useProfile from "@/hooks/useProfile";
import useStreakSummary from "@/hooks/useStreakSummary";
import CustomLoader from "../Common/CustomLoader";

const getGreeting = (hour: number) =>
  hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

const WeekStats = () => {
  const { activeDaysThisWeek, workoutsThisWeek, minutesThisWeek, isLoading } =
    useStreakSummary();

  const stats = [
    {
      label: "Active days",
      value: activeDaysThisWeek,
      unit: "/ 7",
      Icon: CalendarCheck,
      iconClass: "stroke-emerald-400",
    },
    {
      label: "Workouts",
      value: workoutsThisWeek,
      unit: workoutsThisWeek === 1 ? "session" : "sessions",
      Icon: Dumbbell,
      iconClass: "stroke-sky-400",
    },
    {
      label: "Time trained",
      value: minutesThisWeek,
      unit: "min",
      Icon: Timer,
      iconClass: "stroke-amber-400",
    },
  ];

  return (
    <section aria-labelledby="week-stats-heading">
      <h2 id="week-stats-heading" className="mb-3 text-sm font-medium text-zinc-400">
        This week
      </h2>
      <dl className="grid grid-cols-3 gap-3">
        {isLoading ? (
          <CustomLoader amount={3} height="h-[92px]" weight="w-full" />
        ) : (
          stats.map(({ label, value, unit, Icon, iconClass }) => (
            <div
              key={label}
              className="flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3 sm:p-4"
            >
              <dt className="flex items-center gap-2 text-xs text-zinc-400 sm:text-sm">
                <Icon size={16} aria-hidden className={iconClass} />
                {label}
              </dt>
              <dd className="flex items-baseline gap-1">
                <span className="text-2xl font-bold tabular-nums sm:text-3xl">{value}</span>
                <span className="text-xs text-zinc-500 sm:text-sm">{unit}</span>
              </dd>
            </div>
          ))
        )}
      </dl>
    </section>
  );
};

const scrollRow =
  "flex w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent";

const Home = () => {
  const { profile } = useProfile();
  const firstName = profile?.name?.split(" ")?.[0] ?? "";
  const today = new Date();

  return (
    <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-10 px-4 pb-16 pt-2 md:px-8 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="flex min-w-0 flex-col gap-10">
        <header>
          <p className="text-sm text-zinc-400">
            {today.toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            {getGreeting(today.getHours())}
            {firstName
              ? `, ${firstName.charAt(0).toUpperCase()}${firstName.slice(1)}`
              : ""}
          </h1>
        </header>

        <TodayCard />

        <div className="lg:hidden">
          <DailyAttendance />
        </div>

        <WeekStats />

        <HomeSection title="X Days Challenge" seeMoreLink="/challenge">
          <HomeChallenge />
        </HomeSection>

        <HomeSection
          title="Focus areas"
          description="Train one muscle group at a time"
          seeMoreLink="/workouts"
        >
          <div className={scrollRow}>
            <ul className="flex w-full snap-x flex-row flex-nowrap gap-4">
              <FeatureCategories />
            </ul>
          </div>
        </HomeSection>

        <HomeSection
          title="Your workouts"
          description="Workouts you built or were invited to"
          seeMoreLink="/profile?tab=workouts"
        >
          <div className={scrollRow}>
            <ul className="flex w-full snap-x flex-row flex-nowrap gap-4">
              <HomePersonalizeWorkouts />
            </ul>
          </div>
        </HomeSection>

        <div className="lg:hidden">
          <RecentWorkouts />
        </div>
      </div>

      <aside className="hidden lg:block">
        <div className="flex flex-col gap-8">
          <DailyAttendance />
          <RecentWorkouts />
        </div>
      </aside>
    </div>
  );
};

export default Home;
