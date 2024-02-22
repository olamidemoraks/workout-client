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
      {workouts?.length === 0 && (
        <Link
          href={"/workouts/create"}
          className="min-w-[250px] group hover:border-4 transition duration-200 h-[120px] relative border hover:border-purple-700 border-zinc-900 rounded-lg flex items-center justify-center"
        >
          <div className=" uppercase leading-7 tracking-wider z-10 p-4 text-center w-fit">
            <p className="font-bold  text-xl">Customize</p>
            <div className="w-full flex">
              <div className="w-[70%] rounded h-[4px] bg-zinc-500/80" />
              <div className="w-[20%] rounded h-[4px] bg-zinc-500/80 ml-[.21rem]" />
              <div className="w-[10%] rounded h-[4px] bg-zinc-500/80 ml-1" />
            </div>
            <p className="font-bold text-xl">Workouts</p>
          </div>
          <Image
            src="/assets/customize.jpg"
            alt="stripe"
            width={2000}
            height={1335}
            className="h-full w-[100%] absolute object-cover rounded-md opacity-70"
          />
          <div className="w-[50%] h-full flex gap-3 -skew-x-12 absolute right-5">
            <div className="z-10 bg-emerald-500/25 backdrop-blur-sm opacity-30 h-full w-[100px]   "></div>
            <div className="z-10 bg-blue-500/25 backdrop-blur-sm opacity-30 h-full w-[100px]  "></div>
            <div className="z-10 bg-purple-500/25 backdrop-blur-sm opacity-30 h-full w-[100px] mr-2"></div>
          </div>
          <ArrowRight className="right-5  bottom-5 absolute group-hover:translate-y-0 translate-y-6 opacity-0 group-hover:opacity-100 transition duration-300 delay-75  " />
        </Link>
      )}
      <div className="flex overflow-x-auto w-full gap-4 scrollbar-thumb-zinc-900 scrollbar-thin scrollbar-track-transparent pb-4 relative snap-x">
        {workouts?.map((workout) => (
          <PersonalizeWorkoutCard
            workout={workout}
            key={workout._id}
            userId={profile?._id}
          />
        ))}
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
