import { getUserCustomWorkouts } from "@/api/custom.workout";
import Empty from "@/components/Common/Empty";
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
    queryKey: "custom-workout",
    enabled: tab === "workouts" ? true : false,
  });

  const workouts: ICustomWorkout[] = data?.workouts ?? [];

  if (workouts?.length === 0)
    return <Empty title={`You haven't created any \n personal workout yet!`} />;
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
