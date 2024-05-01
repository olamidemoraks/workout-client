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
