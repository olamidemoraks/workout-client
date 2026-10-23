import CustomLoader from "@/components/Common/CustomLoader";
import useRecentWorkout from "@/hooks/useRecentWorkout";
import { formatDuration, toDayKey } from "@/utils";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

const icons: { [key: string]: string } = {
  abs: "/assets/icons/abs.png",
  arm: "/assets/icons/arm.png",
  back: "/assets/icons/back.webp",
  chest: "/assets/icons/chest.png",
  legs: "/assets/icons/leg.png",
  challenge: "/assets/icons/challenge.webp",
  custom: "/assets/icons/calender.png",
};

const getIcon = (activity: any) => {
  if (activity?.workoutType === "challenge") return icons.challenge;
  if (activity?.workoutType === "default") {
    const bodyPart = (activity?.workoutName as string)?.split(" ")?.[0]?.toLowerCase();
    return icons[bodyPart] ?? icons.custom;
  }
  return icons.custom;
};

const formatWhen = (value: string) => {
  const date = new Date(value);
  const time = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (toDayKey(date) === toDayKey(new Date())) return `Today, ${time}`;
  if (toDayKey(date) === toDayKey(yesterday)) return `Yesterday, ${time}`;
  return `${date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  })}, ${time}`;
};

const RecentWorkouts = () => {
  const { data, isLoading } = useRecentWorkout();
  const recentWorkoutActivities: any[] = useMemo(() => {
    return data?.activities?.slice(0, 5) ?? [];
  }, [data]);

  return (
    <section className="flex w-full flex-col gap-4">
      <h2 className="text-lg font-semibold">Recent activity</h2>

      {isLoading ? (
        <div className="flex flex-col gap-2">
          <CustomLoader amount={4} height="h-[68px]" weight="w-full" />
        </div>
      ) : recentWorkoutActivities.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-800 p-6 text-center">
          <p className="font-medium">No workouts yet</p>
          <p className="mt-1 text-sm text-zinc-400">
            Finished sessions will show up here.
          </p>
          <Link
            href="/workouts"
            className="mt-4 inline-block text-sm font-semibold text-emerald-400 hover:text-emerald-300"
          >
            Find a workout
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {recentWorkoutActivities.map((activity) => (
            <li
              key={activity?._id}
              className="flex items-center gap-3 rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-3"
            >
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-zinc-200">
                <Image
                  src={getIcon(activity)}
                  alt=""
                  fill
                  sizes="44px"
                  className="object-contain p-1"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium capitalize">
                  {activity?.workoutName}
                </p>
                <p className="text-sm text-zinc-500">
                  {formatWhen(activity?.createdAt)}
                </p>
              </div>
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-zinc-800/80 px-2.5 py-1 text-xs font-medium text-zinc-300">
                <Clock size={12} aria-hidden className="stroke-zinc-400" />
                {formatDuration(activity?.totalTime)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default RecentWorkouts;
