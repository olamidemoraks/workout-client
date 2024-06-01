import { getUserCustomWorkouts } from "@/api/custom.workout";
import useProfile from "@/hooks/useProfile";
import { useQuery } from "react-query";
import CustomLoader from "../Common/CustomLoader";
import PersonalizeWorkoutCard from "./PersonalizeWorkoutCard";
import Empty from "../Common/Empty";
import { BiPlus } from "react-icons/bi";
import Link from "next/link";

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
     {
      workouts?.length > 0 ? <>
       {workouts?.map((workout) => (
        <PersonalizeWorkoutCard
          workout={workout}
          key={workout?._id}
          userId={profile?._id}
        />
      ))}</>: 
     <div className=" bg-zinc-900/60 border border-zinc-800 w-full rounded-md py-6 flex items-center justify-center flex-col gap-3">
       <Empty title="No workout yet!"/>
       <Link href={"/workouts/create"} className="p-3 rounded-full bg-zinc-800 border border-zinc-700 cursor-pointer">
          <BiPlus size={25}/>
       </Link>
     </div>
     }
    </>
  );
};

export default HomePersonalizeWorkouts;
