import { getUserCustomWorkouts } from "@/api/custom.workout";
import Empty from "@/components/Common/Empty";
import PersonalizeWorkoutCard from "@/components/PersonalizeWorkout/PersonalizeWorkoutCard";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";

const Workouts = () => {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");
  const { data, isLoading } = useQuery({
    queryFn: async () => await getUserCustomWorkouts({ userId: id ?? "" }),
    queryKey: "custom-workout",
    enabled: !!id,
  });

  const workouts: ICustomWorkout[] = data?.workouts ?? [];

  if (workouts?.length === 0)
    return <Empty title={`You haven't created any \n personal workout yet!`} />;
  return (
    <div className="grid sm:grid-cols-3 grid-cols-2 w-full gap-1 md:gap-3  min-h-[60vh]">
      {workouts?.map((workout) => (
        <PersonalizeWorkoutCard
          workout={workout}
          userId={id}
          key={workout._id}
          isProfile
        />
      ))}
    </div>
  );
};

export default Workouts;
