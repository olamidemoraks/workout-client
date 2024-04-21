import {
  deleteCustomWorkout,
  getUserCustomWorkouts,
} from "@/api/custom.workout";
import useProfile from "@/hooks/useProfile";
import {
  ArrowRight,
  BarChart3,
  BarChartBig,
  Edit,
  Edit2,
  Play,
  Plus,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiDotsVerticalRounded, BiSolidBarChartSquare } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Button from "@mui/material/Button";
import { Menu as MuiMenu } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import { cn } from "@/libs/utils";
import DeleteModal from "../Modal/DeleteModal";
import PersonalizeWorkoutCard from "./PersonalizeWorkoutCard";
import CustomLoader from "../Common/CustomLoader";

const HomePersonalizeWorkouts = () => {
  const { profile } = useProfile();
  const { data, isLoading } = useQuery({
    queryFn: async () => await getUserCustomWorkouts({ userId: profile?._id }),
    queryKey: "custom-workout",
    enabled: !!profile?._id,
  });

  const workouts: ICustomWorkout[] = data?.workouts;
  return (
    <div className="flex gap-4 ">
      <div className="flex overflow-x-auto w-full gap-4 scrollbar-thumb-zinc-900 scrollbar-thin scrollbar-track-transparent pb-4 relative snap-x">
        {isLoading ? (
          <CustomLoader
            amount={4}
            height="h-[170px]"
            weight="sm:min-w-[300px] min-w-[200px]"
          />
        ) : (
          <>
            {workouts?.map((workout) => (
              <PersonalizeWorkoutCard
                workout={workout}
                key={workout._id}
                userId={profile?._id}
              />
            ))}
          </>
        )}
      </div>
      {/* <Link
        href={"/workouts/create"}
        className="snap-start min-w-[300px] h-[160px] bg-zinc-900/30 backdrop-blur-sm hover:bg-neutral-900  rounded-md flex items-center flex-col justify-center"
      >
        <Plus />
        <p>New Workout</p>
      </Link> */}
    </div>
  );
};

export default HomePersonalizeWorkouts;
