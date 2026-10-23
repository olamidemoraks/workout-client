import { getUserCustomWorkouts } from "@/api/custom.workout";
import CustomLoader from "@/components/Common/CustomLoader";
import Empty from "@/components/Common/Empty";
import { BiPlus } from "react-icons/bi";
import PersonalizeWorkoutCard from "@/components/PersonalizeWorkout/PersonalizeWorkoutCard";
import useProfile from "@/hooks/useProfile";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";

const Workouts = () => {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");
  const tab = searchParams?.get("tab");
  const { profile } = useProfile();
  const { data, isLoading } = useQuery({
    queryFn: async () =>
      await getUserCustomWorkouts({ userId: id ?? profile?._id }),
    // Prefixed so invalidateQueries("custom-workout") still refreshes it.
    queryKey: ["custom-workout", id ?? profile?._id],
    enabled: tab === "workouts" ? true : false,
  });

  const workouts: ICustomWorkout[] = data?.workouts ?? [];
  const isOwnProfile = !id || id === profile?._id;

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-4 w-full gap-8">
        <CustomLoader amount={3} height="h-[200px]" weight="w-full" />
      </div>
    );
  }

  if (workouts?.length === 0)
    return (
      <div className="flex flex-col items-center gap-3 pb-6">
        <Empty
          title={
            isOwnProfile
              ? `You haven't created any \n personal workout yet!`
              : "No personal workouts yet"
          }
        />
        {isOwnProfile && (
          <Link
            href="/workouts/create"
            className="flex items-center gap-2 rounded-full bg-zinc-800 border border-zinc-700 px-4 py-2 text-sm font-semibold hover:bg-zinc-700 transition-colors -mt-4"
          >
            <BiPlus size={20} />
            Create a workout
          </Link>
        )}
      </div>
    );
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-4 w-full  gap-8  min-h-[60vh]">
      {workouts?.map((workout) => (
        <PersonalizeWorkoutCard
          workout={workout}
          userId={profile?._id}
          key={workout._id}
          isProfile
        />
      ))}
    </div>
  );
};

export default Workouts;
