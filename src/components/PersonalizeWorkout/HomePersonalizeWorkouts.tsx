import { getUserCustomWorkouts } from "@/api/custom.workout";
import useProfile from "@/hooks/useProfile";
import { useQuery } from "react-query";
import CustomLoader from "../Common/CustomLoader";
import PersonalizeWorkoutCard from "./PersonalizeWorkoutCard";

const HomePersonalizeWorkouts = () => {
  const { profile } = useProfile();
  const { data, isLoading } = useQuery({
    queryFn: async () => await getUserCustomWorkouts({ userId: profile?._id }),
    queryKey: "custom-workout",
    enabled: !!profile?._id,
  });

  const workouts: ICustomWorkout[] = data?.workouts;

  if (isLoading) {
    return (
      <CustomLoader
        amount={4}
        height="h-[170px]"
        weight="sm:min-w-[300px] min-w-[200px]"
      />
    );
  }
  return (
    <>
      {workouts?.map((workout) => (
        <PersonalizeWorkoutCard
          workout={workout}
          key={workout?._id}
          userId={profile?._id}
        />
      ))}
    </>
  );
};

export default HomePersonalizeWorkouts;
